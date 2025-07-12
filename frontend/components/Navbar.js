import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold">🛒 Wallmart</div>
      <div className="space-x-6">
        <Link href="/">Home</Link>
        {session ? (
          <>
            <Link href="/deals">Deals</Link>
            <Link href="/quest">Quest</Link>
            <Link href="/spin">Spin</Link>
            <Link href="/leaderboard">Leaderboard</Link>
            <Link href="/cart" className="ml-4 text-yellow-500">Cart</Link>
          </>
        ) : (
          <>
            <button onClick={() => signIn('google')} className="ml-4 underline">
              Sign in to access more
            </button>
          </>
        )}
      </div>
      <div>
        {session ? (
          <button onClick={() => signOut()} className="ml-4 bg-white text-blue-600 px-3 py-1 rounded">
            Sign Out
          </button>
        ) : (
          <button onClick={() => signIn('google')} className="ml-4 bg-white text-blue-600 px-3 py-1 rounded">
            Sign In
          </button>
        )}
      </div>
    </nav>
  )
}
