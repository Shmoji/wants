import type { NextPage } from 'next'
import DefaultLayout from 'components/layouts/DefaultLayout'
import { useState } from 'react'
import { aliases } from 'utils/ceramic'
import { useWeb3React } from '@web3-react/core'
import useIdx from 'utils/ceramic/useIdx'

const SubmitWant: NextPage = () => {
  const { account } = useWeb3React()
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const idx = useIdx()

  async function submitWant() {
    const newWant = { title, details }
    
    const data = await idx?.get(
      aliases.personalWants,
      `${account}@eip155:4`
    ) as any

    const PersonalWants = data ? data.PersonalWants : []

    await idx?.set(aliases.personalWants, {
      PersonalWants: [ ...PersonalWants, newWant ]
    })
  }

  return (
    <div className="p-4 mx-auto max-w-4xl">
      <p className="text-2xl text-center">
        {' '}
        Add a WANT
      </p>
      <p className="font-bold text-center my-3">NOTE: All data submitted is public. Do not enter any data that you want to be private.</p>
      <textarea
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Summarize what you want..."
        className="w-full p-2 border-2 rounded"
        rows={1}
        autoFocus={true}
      />
      <textarea
        value={details}
        onChange={(event) => setDetails(event.target.value)}
        placeholder="In detail, what do you want? (optional)"
        className="w-full p-2 border-2 rounded"
      />
      <button onClick={submitWant} className="p-3 bg-blue-600 text-white rounded">Submit new WANT</button>
    </div>
  )
}

SubmitWant.layoutProps = {
  Layout: DefaultLayout,
}

export default SubmitWant
