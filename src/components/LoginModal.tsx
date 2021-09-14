import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import Modal from './modals/Modal'

const NoSSRWalletInterface = dynamic(() => import('./wallet/WalletInterface'), {
  ssr: false,
})

export default function LoginModal({ close }: { close: () => void }) {
  const [step, setStep] = useState(1)

  return (
    <Modal close={close} className="w-full md:w-3/5">
      <div className="p-5">
        <div className="mx-4 p-4">
          <div className="flex items-center">
            <div className="flex items-center text-teal-600 relative">
              <div className={classNames(
                step === 1 && "bg-blue-200",
                "rounded-full flex justify-center items-center transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300")}
              >
                1
              </div>
              <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">Wallet</div>
            </div>
            <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
            <div className="flex items-center text-teal-600 relative">
              <div className={classNames(
                step === 2 && "bg-blue-200",
                "rounded-full flex justify-center items-center transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-teal-600 border-gray-300")}
              >
                2
              </div>
              <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">DID</div>
            </div>
            <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
            <div className="flex items-center text-gray-500 relative">
              <div className={classNames(
                step === 3 && "bg-blue-200",
                "rounded-full flex justify-center items-center transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300")}
              >  
                3
              </div>
              <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">Confirm</div>
            </div>
          </div>
        </div>
        <div className="mt-8 p-4">
          {step === 1 && (
            <div>
              <NoSSRWalletInterface onWalletConnected={close} />
            </div>
          )}
          {step === 2 && (
            <div>
              <button className="py-2 text-lg font-bold text-white rounded-lg w-44 bg-blue-600 hover:bg-blue-800">Connect to DID</button>
            </div>
          )}
          {step === 3 && (
            <div>

            </div>
          )}
          <div className="flex p-2 mt-4">
            <button onClick={() => setStep(step - 1)} className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
              hover:bg-gray-200  
              bg-gray-100 
              text-gray-700 
              border duration-200 ease-in-out 
              border-gray-600 transition">Previous</button>
            <div className="flex-auto flex flex-row-reverse">
              <button onClick={() => setStep(step + 1)}  className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
                hover:bg-teal-600  
                bg-teal-600 
                text-teal-100 
                border duration-200 ease-in-out 
                border-teal-600 transition">Next</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}