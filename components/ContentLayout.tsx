import Link from 'next/link'

type Props = { title: string; subtitle?: string; children: React.ReactNode }

export default function ContentLayout({ title, subtitle, children }: Props) {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <div className="border-b border-[#E8E0D8] py-14 text-center bg-white">
        <Link href="/" className="font-['Playfair_Display'] text-3xl tracking-widest text-[#0A0A0A]">AURA</Link>
        <h1 className="mt-6 font-['Playfair_Display'] text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 text-xs text-[#888] tracking-wider">{subtitle}</p>}
      </div>
      <div className="max-w-3xl mx-auto px-6 py-16">{children}</div>
    </main>
  )
}
