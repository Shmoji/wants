import type { NextPage } from 'next'
import DefaultLayout from 'components/layouts/DefaultLayout'
import { useState } from 'react'

const SubmitWant: NextPage = () => {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')

  async function submitWant() {

  }

  return (
    <div className="p-4">
      <p className="text-2xl text-center">
        {' '}
        Add a WANT
      </p>
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
