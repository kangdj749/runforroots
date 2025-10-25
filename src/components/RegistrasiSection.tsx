"use client"

import { useState, useEffect, Suspense } from "react"
import { useForm, SubmitHandler, UseFormRegisterReturn } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

// ====== Schema Validasi ======
const formSchema = z.object({
  nama: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  nohp: z
    .string()
    .min(8, "Nomor HP terlalu pendek")
    .regex(/^[0-9+]+$/, "Hanya angka atau tanda +"),
  lari: z.enum(["FAMILY - 2,5K", "CASUAL - 5K", "RACE - 10K"]),
  jersey: z.string().min(1, "Wajib pilih ukuran jersey"),
  pembayaran: z.string().min(1, "Wajib pilih metode pembayaran"),
  fundriser: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyepCFd9Chfse9obYsuMxcdFYzoLR4KFEAH2SSvd0SQGildOO2kYxTX_j2IIc7nZ6s/exec"

export default function RegistrasiSectionWrapper() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading form...</div>}>
      <RegistrasiSection />
    </Suspense>
  )
}

function RegistrasiSection() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [activeFundriser, setActiveFundriser] = useState("Tanpa Fundriser")

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: { fundriser: "Tanpa Fundriser" },
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const fundriserFromLink = params.get("fundriser")
      const stored = localStorage.getItem("fundriser")
      const finalFundriser = fundriserFromLink || stored || "Tanpa Fundriser"

      setActiveFundriser(finalFundriser)
      setValue("fundriser", finalFundriser)
      if (fundriserFromLink) localStorage.setItem("fundriser", fundriserFromLink)
    }
  }, [setValue])

  const handleSubmitForm: SubmitHandler<FormValues> = async (data) => {
    if (submitting) return
    setSubmitting(true)

    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as any),
      })
      if (!res.ok) throw new Error("Gagal simpan ke Google Sheets")

      toast.success("Registrasi berhasil ✅", {
        description: "Kamu akan diarahkan ke halaman konfirmasi pembayaran...",
      })

      setTimeout(() => {
        const query = new URLSearchParams(data as any).toString()
        router.push(`/konfirmasi?${query}`)
      }, 1200)
    } catch (err) {
      console.error(err)
      toast.error("Registrasi Gagal ❌", {
        description: "Terjadi kesalahan. Coba lagi ya 🙏",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="registrasi"
      className="py-20 px-4 bg-gradient-to-b from-green-50 via-white to-green-50"
    >
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-3xl shadow-lg border border-green-100 p-6 md:p-10">
          <h2 className="text-3xl font-bold text-green-700 text-center">
            Form Registrasi Peserta
          </h2>
          <p className="text-sm text-gray-600 text-center mt-2">
            Lengkapi data di bawah ini. Setelah submit, kamu akan diarahkan ke
            halaman konfirmasi pembayaran.
          </p>

          <form onSubmit={handleSubmit(handleSubmitForm)} className="mt-8 space-y-6">
            <FormInput
              label="Nama Lengkap"
              register={register("nama")}
              error={errors.nama?.message}
              placeholder="cth: Budi Santoso"
            />
            <FormInput
              label="Email"
              type="email"
              register={register("email")}
              error={errors.email?.message}
              placeholder="cth: email@gmail.com"
            />
            <FormInput
              label="No HP / WhatsApp"
              register={register("nohp")}
              error={errors.nohp?.message}
              placeholder="cth: 08123456789"
            />
            <FormSelect
              label="Kategori Lari"
              register={register("lari")}
              error={errors.lari?.message}
              options={["FAMILY - 2,5K", "CASUAL - 5K", "RACE - 10K"]}
            />
            <FormSelect
              label="Ukuran Jersey"
              register={register("jersey")}
              error={errors.jersey?.message}
              options={["S (P=66, L=48, Lengan=21)", "M (P=68, L=50, Lengan=22)", "L (P=71, L=52, Lengan=23)", "XL (P=74, L=54, Lengan=24)", "XXL (P=77, L=56, Lengan=25)"]}
            />
            <FormSelect
              label="Metode Pembayaran"
              register={register("pembayaran")}
              error={errors.pembayaran?.message}
              options={["Transfer Bank", "E-Wallet (OVO/Gopay/Dana)"]}
            />

            <input type="hidden" {...register("fundriser")} />

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 text-white font-semibold py-3 hover:bg-green-700 transition disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Mengirim...
                </>
              ) : (
                "Daftar Sekarang"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

// ====== Helper Components ======
interface FormInputProps {
  label: string
  register: UseFormRegisterReturn
  error?: string
  type?: string
  placeholder?: string
}

function FormInput({
  label,
  register,
  error,
  type = "text",
  placeholder,
}: FormInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        {...register}
        placeholder={placeholder}
        className="w-full rounded-xl border border-green-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 bg-white"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

interface FormSelectProps {
  label: string
  register: UseFormRegisterReturn
  error?: string
  options: string[]
}

function FormSelect({ label, register, error, options }: FormSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        {...register}
        className="w-full rounded-xl border border-green-200 px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500 bg-white"
      >
        <option value="">-- Pilih {label} --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
