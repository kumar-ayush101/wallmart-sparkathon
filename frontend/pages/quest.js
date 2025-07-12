import { useState, useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'

export default function Quest() {
  const [questProducts, setQuestProducts] = useState([])
  const { data: session } = useSession()

  useEffect(() => {
    const dayIndex = new Date().getDay() // 0 (Sun) - 6 (Sat)

    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(allProducts => {
        const dailyQuests = pickQuestProducts(allProducts, dayIndex)
        setQuestProducts(dailyQuests)
      })
  }, [])

  const pickQuestProducts = (products, day) => {
    // make a consistent "random" slice by sorting with day
    return products
      .slice() // copy array
      .sort((a, b) => ((hash(a.name + day) % 100) - (hash(b.name + day) % 100)))
      .slice(0, 10)
  }

  const hash = (str) => {
    // simple hash for deterministic shuffle
    let h = 0
    for (let i = 0; i < str.length; i++) {
      h = (h << 5) - h + str.charCodeAt(i)
      h |= 0 // convert to 32bit int
    }
    return Math.abs(h)
  }

  const handleAddToCart = async (productId) => {
  if (!session) {
    alert("Please sign in to complete quest items.")
    signIn()
    return
  }

  const res = await fetch(`http://localhost:5000/api/cart/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: session.user.email, productId })
  });

  const data = await res.json();
  if (data.earnedPoints > 0) {
    alert(`${data.message} 🎉 +${data.earnedPoints} tokens awarded`);
  } else {
    alert(`${data.message}`);
  }
};


  return (
    <div className="p-8">
      <h1 className="text-3xl ml-150 font-bold mb-6">🎯 Today's Quest</h1>
      <div className="grid grid-cols-3 gap-4">
        {questProducts.map(product => (
          <div key={product._id} className="border p-4 rounded shadow">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover"/>
            <h2 className="text-xl mt-2">{product.name}</h2>
            <p>${product.price}</p>
            <button onClick={() => handleAddToCart(product._id)} className="mt-2 text-green-600">
              Add to Cart for Quest Reward
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
