import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold">🛒 Wallmart</div>
      <div className="space-x-6">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/deals" className="hover:underline">Deals</Link>
        <Link href="/school" className="hover:underline">School</Link>
        <Link href="/spin" className="hover:underline">Spin</Link>
      </div>
    </nav>
  )
}
