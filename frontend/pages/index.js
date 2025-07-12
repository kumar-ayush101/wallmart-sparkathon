import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleAddToCart = async (productId) => {
  if (!session) {
    alert("Please sign in to add items to your cart.");
    signIn();
    return;
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


  const handleBuyNow = (productId) => {
    if (!session) {
      alert("Please sign in to buy items.");
      signIn();
      return;
    }
    // redirect to buy page
    window.location.href = `/buy?id=${productId}`;
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-8">
      {products.map(product => (
        <div key={product._id} className="border p-4 rounded shadow">
          <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover"/>
          <h2 className="text-xl mt-2">{product.name}</h2>
          <p>${product.price}</p>
          <button onClick={() => handleAddToCart(product._id)} className="text-blue-500">Add to Cart</button>
          <button onClick={() => handleBuyNow(product._id)} className="ml-4 text-green-500">Buy Now</button>
        </div>
      ))}
    </div>
  );
}
