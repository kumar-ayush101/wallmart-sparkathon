import { getSession } from "next-auth/react"

export default function Deals() {
  return (
    <div className="p-8">
      <h1 className="text-3xl ml-150 font-bold mb-6">Exclusive Deals 🎉</h1>
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
