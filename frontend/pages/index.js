import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Wallmart Clone</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(product => (
          <div key={product._id} className="bg-gray-100 p-6 rounded-lg hover:bg-gray-200 transition">
            <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded mb-4" />
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="mb-2">${product.price}</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
