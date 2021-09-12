import { Transition } from '@headlessui/react'
import classNames from 'classnames'
import { ReactNode, useEffect } from 'react'
import { XCircleIcon } from '@heroicons/react/solid'

export default function Modal({
  className = '',
  children,
  close,
  isCloseActive = true, // Is close button there by default?
}: {
  className?: string
  children?: ReactNode
  close: () => void
  isCloseActive?: boolean
}) {
  // Disable Scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className="flex items-center justify-center p-4 text-center">
      <span className="inline-block h-screen align-middle"></span>
      &#8203;
      <Transition
        show={true}
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        className={classNames(className, "inline-block text-left transition-all transform rounded-lg overflow-hidden")}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        {isCloseActive && (
          <div className="flex pb-2">
            <button
              type="button"
              className="p-2 ml-auto text-white transition duration-150 ease-in-out rounded-xl w-9 h-9 bg-very-dark-blue hover:text-gray-500 focus:outline-none focus:text-gray-500"
              aria-label="Close"
              onClick={close}
            >
              <XCircleIcon className="w-full h-full" />
            </button>
          </div>
        )}
        <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden">
          {children}
        </div>
      </Transition>
    </div>
  )
}
