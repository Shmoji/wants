import { useWeb3React } from "@web3-react/core"
import DefaultLayout from "components/layouts/DefaultLayout"
import { useEffect, useState } from "react"

const Profile = () => {
  const { account } = useWeb3React()
  const [username, setUsername] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await window?.idx?.get(
          'basicProfile',
          `${account}@eip155:4`
        )
        console.log('data: ', data)
        setUsername(data?.name)
      } catch (error) {
        console.log('error: ', error)
      }
    }

    fetchData()
  }, [account])

  return (
    <div className="mt-6 mx-auto max-w-4xl text-center">
      <span className="font-bold text-lg">{username}</span>
    </div>
  )
}

Profile.layoutProps = {
  Layout: DefaultLayout,
}

export default Profile
