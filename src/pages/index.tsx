import type { NextPage } from 'next'
import DefaultLayout from 'components/layouts/DefaultLayout'
import { useWeb3React } from '@web3-react/core'
import useIdx from 'utils/ceramic/useIdx'

const Home: NextPage = () => {
  const { account } = useWeb3React()
  const idx = useIdx()

  const logProfile = async () => {
    try {
      const data = await idx?.get(
        'basicProfile',
        `${account}@eip155:4`
      )
      console.log('data: ', data)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return (
    <div>
      <button onClick={logProfile} className="py-2 mt-2 text-lg font-bold text-white rounded-lg w-44 bg-blue-600 hover:bg-blue-800">Log Profile</button>
    </div>
  )
}

Home.layoutProps = {
  Layout: DefaultLayout,
}

export default Home
