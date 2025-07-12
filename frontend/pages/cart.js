import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function Cart() {
  const { data: session } = useSession()
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    if (session) {
      fetch(`http://localhost:5000/api/cart/${session.user.email}`)
        .then(res => res.json())
        .then(data => setCartItems(data.cart || []))
    }
  }, [session])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>
      <div className="grid grid-cols-3 gap-4">
        {cartItems.map(product => (
          <div key={product._id} className="border p-4 rounded shadow">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover"/>
            <h2 className="text-xl mt-2">{product.name}</h2>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
