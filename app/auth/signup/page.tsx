'use client'
// app/auth/signup/page.tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error || 'Registration failed.')
    } else {
      router.push('/auth/login?registered=1')
    }
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="font-['Playfair_Display'] text-3xl tracking-widest text-[#0A0A0A]">
            AURA
          </Link>
          <p className="mt-2 text-xs tracking-[0.2em] uppercase text-[#C9A96E]">
            Premium South Asian Fashion
          </p>
        </div>

        <div className="bg-white border border-[#E8E0D8] p-8">
          <h1 className="font-['Playfair_Display'] text-2xl text-[#0A0A0A] mb-1">Create Account</h1>
          <p className="text-sm text-[#888] mb-8">Join the Aura family today</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your Name' },
              { key: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
              { key: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
              { key: 'confirm', label: 'Confirm Password', type: 'password', placeholder: '••••••••' },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="block text-xs tracking-widest uppercase text-[#555] mb-2">
                  {label}
                </label>
                <input
                  type={type}
                  required
                  value={(form as any)[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full border border-[#DDD] px-4 py-3 text-sm text-[#0A0A0A] outline-none focus:border-[#C9A96E] transition-colors bg-transparent"
                  placeholder={placeholder}
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0A0A0A] text-white text-xs tracking-widest uppercase py-4 hover:bg-[#C9A96E] transition-colors duration-300 disabled:opacity-60"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[#888]">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[#C9A96E] hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
