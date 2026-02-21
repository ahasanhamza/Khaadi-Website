import ContentLayout from '@/components/ContentLayout'

export const metadata = { title: 'Size Guide – Aura' }

const SIZES = [
  { size: 'XS', bust: '32"', waist: '26"', hip: '35"', length: '52"' },
  { size: 'S',  bust: '34"', waist: '28"', hip: '37"', length: '53"' },
  { size: 'M',  bust: '36"', waist: '30"', hip: '39"', length: '54"' },
  { size: 'L',  bust: '38"', waist: '32"', hip: '41"', length: '55"' },
  { size: 'XL', bust: '40"', waist: '34"', hip: '43"', length: '56"' },
  { size: 'XXL', bust: '42"', waist: '36"', hip: '45"', length: '57"' },
]

export default function SizeGuidePage() {
  return (
    <ContentLayout title="Size Guide" subtitle="Find your perfect fit">
      <p className="text-sm text-[#555] leading-relaxed mb-8">
        All measurements below are garment dimensions in inches. We recommend measuring yourself and adding 1–2 inches for comfort. When between sizes, size up.
      </p>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border border-[#E8E0D8]">
          <thead className="bg-[#0A0A0A] text-white">
            <tr>
              {['Size', 'Bust', 'Waist', 'Hip', 'Shirt Length'].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs tracking-widest uppercase font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SIZES.map((row, i) => (
              <tr key={row.size} className={`border-t border-[#F0EBE6] ${i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
                <td className="px-5 py-3 font-['Playfair_Display'] text-base">{row.size}</td>
                <td className="px-5 py-3 text-[#555]">{row.bust}</td>
                <td className="px-5 py-3 text-[#555]">{row.waist}</td>
                <td className="px-5 py-3 text-[#555]">{row.hip}</td>
                <td className="px-5 py-3 text-[#555]">{row.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border border-[#E8E0D8] bg-white p-6">
        <h3 className="font-['Playfair_Display'] text-lg mb-4">How to Measure</h3>
        <div className="space-y-3 text-sm text-[#555]">
          <p><strong className="text-[#0A0A0A]">Bust:</strong> Measure around the fullest part of your chest, keeping the tape parallel to the ground.</p>
          <p><strong className="text-[#0A0A0A]">Waist:</strong> Measure around the narrowest part of your natural waistline.</p>
          <p><strong className="text-[#0A0A0A]">Hip:</strong> Measure around the fullest part of your hips, approximately 8 inches below your waist.</p>
          <p><strong className="text-[#0A0A0A]">Length:</strong> Measure from the top of the shoulder straight down to your desired hemline.</p>
        </div>
      </div>
    </ContentLayout>
  )
}
