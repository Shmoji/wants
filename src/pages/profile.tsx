import { useWeb3React } from "@web3-react/core"
import DefaultLayout from "components/layouts/DefaultLayout"
import { PersonalWant } from "constants"
import { useEffect, useState } from "react"
import { aliases } from "utils/ceramic"
import useIdx from "utils/ceramic/useIdx"

const Profile = () => {
  const { account } = useWeb3React()
  const [username, setUsername] = useState('')
  const [wants, setWants] = useState([])
  const idx = useIdx(account as any)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await idx?.get(
          'basicProfile',
          `${account}@eip155:4`
        )
        setUsername(profileData?.name)
        console.log('data: ', profileData)
        const wantsData = await idx?.get(
          aliases.personalWants,
          `${account}@eip155:4`
        )
        setWants(wantsData ? wantsData?.PersonalWants : [])
        console.log('data: ', wantsData)
      } catch (error) {
        console.log('error: ', error)
      }
    }

    fetchData()
  }, [account, idx])

  return (
    <div className="mt-6 mx-auto max-w-4xl text-center">
      <div className="font-bold text-lg mb-4">{username}</div>
      <div className="flex flex-col justify-center items-center">
        {wants.map((want: PersonalWant, i) => {
          return (
            <div className="w-3/4 rounded-lg border px-4 py-2 mb-2 text-left" key={i}>
              <div className="mb-3">{want?.title}</div>
              <div>{want?.details}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

Profile.layoutProps = {
  Layout: DefaultLayout,
}

export default Profile
