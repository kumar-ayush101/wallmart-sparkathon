import { getSession } from "next-auth/react"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Leaderboard() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/leaderboard/top')
      .then(res => setUsers(res.data.leaderboard))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="p-8 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">🏆 Leaderboard</h1>
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-6 rounded-tl-2xl">User</th>
              <th className="py-3 px-6 rounded-tr-2xl">Tokens</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={user._id}
                className={idx % 2 === 0 ? "bg-gray-50 hover:bg-blue-50" : "bg-white hover:bg-blue-50"}
              >
                <td className="py-3 px-6 border-b">{user.userId}</td>
                <td className="py-3 px-6 border-b font-semibold text-blue-700">{user.monthlyPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }
  return {
    props: { session },
  }
}
