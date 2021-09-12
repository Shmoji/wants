import Modal from './modals/Modal'
import { useWeb3React } from '@web3-react/core'
import CeramicClient from '@ceramicnetwork/http-client'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect'
import { DID } from 'dids'
import { IDX } from '@ceramicstudio/idx'
import { aliases } from 'utils/ceramic'

const endpoint = "https://ceramic-clay.3boxlabs.com"

export default function DIDModal({ close }: { close: () => void }) {
  const { account } = useWeb3React()

  const connectToDID = async () => {
    const ceramic = new CeramicClient(endpoint)
    const threeIdConnect = new ThreeIdConnect()
    const provider = new EthereumAuthProvider((window as any).ethereum, account as any)

    await threeIdConnect.connect(provider)

    const did = new DID({
      provider: threeIdConnect.getDidProvider(),
      resolver: {
        ...ThreeIdResolver.getResolver(ceramic)
      }
    })

    ceramic.setDID(did)
    await ceramic?.did?.authenticate()

    const idx = new IDX({ ceramic })
    
    try {
      const data = await idx.get(
        'basicProfile',
        `${account}@eip155:4`
      )
      console.log('data: ', data)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return (
    <Modal close={close} className="w-full md:w-3/5">
      <div className="p-4">
        <div>If you want a profile or to add any data to this platform, you need to connect to a <a>decentralized data identity (DID)</a>. If you choose to connect to a DID, you do not need to provide any information unless you want to, including your username.</div>
        <button className="py-2 mt-2 text-lg font-bold text-white rounded-lg w-44 bg-blue-600 hover:bg-blue-800">Connect to DID</button>
      </div>
    </Modal>
  )
}
