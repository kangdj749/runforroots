// src/app/api/meta/event/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

function hashData(value: string) {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export async function POST(req: Request) {
  try {
    const { event_name, user_data } = await req.json();

    if (!META_PIXEL_ID || !META_ACCESS_TOKEN) {
      return NextResponse.json({ error: "Missing Meta credentials" }, { status: 400 });
    }

    const payload = {
      data: [
        {
          event_name,
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_source_url: user_data?.url || "",
          user_data: {
            em: user_data?.email ? [hashData(user_data.email)] : undefined,
            ph: user_data?.phone ? [hashData(user_data.phone)] : undefined,
            fn: user_data?.first_name ? [hashData(user_data.first_name)] : undefined,
            ln: user_data?.last_name ? [hashData(user_data.last_name)] : undefined,
            client_ip_address: user_data?.ip,
            client_user_agent: user_data?.user_agent,
          },
        },
      ],
      access_token: META_ACCESS_TOKEN,
    };

    const res = await fetch(
      `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const result = await res.json();
    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error("Meta Event API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
