'use client'
// app/auth/login/page.tsx
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    })

    setLoading(false)

    if (res?.error) {
      setError('Invalid email or password. Please try again.')
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="font-['Playfair_Display'] text-3xl tracking-widest text-[#0A0A0A]">
            AURA
          </Link>
          <p className="mt-2 text-xs tracking-[0.2em] uppercase text-[#C9A96E]">
            Premium South Asian Fashion
          </p>
        </div>

        <div className="bg-white border border-[#E8E0D8] p-8">
          <h1 className="font-['Playfair_Display'] text-2xl text-[#0A0A0A] mb-1">Welcome Back</h1>
          <p className="text-sm text-[#888] mb-8">Sign in to your Aura account</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#555] mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-[#DDD] px-4 py-3 text-sm text-[#0A0A0A] outline-none focus:border-[#C9A96E] transition-colors bg-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase text-[#555] mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-[#DDD] px-4 py-3 text-sm text-[#0A0A0A] outline-none focus:border-[#C9A96E] transition-colors bg-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0A0A0A] text-white text-xs tracking-widest uppercase py-4 hover:bg-[#C9A96E] transition-colors duration-300 disabled:opacity-60"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[#888]">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-[#C9A96E] hover:underline">
              Create one
            </Link>
          </div>
        </div>

        {/* Demo credentials hint */}
        <p className="mt-4 text-center text-xs text-[#AAA]">
          Admin demo: admin@aura.com / Admin123!
        </p>
      </div>
    </main>
  )
}
