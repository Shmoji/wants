import { useWeb3React } from "@web3-react/core"
import DefaultLayout from "components/layouts/DefaultLayout"
import { PersonalWant } from "constants"
import { GetServerSideProps } from "next"
import { useEffect, useState } from "react"
import { aliases } from "utils/ceramic"
import useIdx from "utils/ceramic/useIdx"

type Props = {
  address: string
  index: number
}

const Want = ({address, index}: Props) => {
  const [want, setWant] = useState<PersonalWant>(null)
  const idx = useIdx() 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wantsData = await idx?.get(
          aliases.personalWants,
          `${address}@eip155:4`
        )
        setWant(wantsData ? wantsData?.PersonalWants[index] : null)
      } catch (error) {
        console.log('error: ', error)
      }
    }

    fetchData()
  }, [address, index, idx])

  return (
    <div className="text-center">
      <p className="text-4xl font-bold mt-4">{want?.title}</p>
      <p className="my-4">{want?.details}</p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      address: context.query.address,
      index: context.query.index,
    },
  }
}

Want.layoutProps = {
  Layout: DefaultLayout,
}

export default Want
