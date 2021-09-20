import CeramicClient from '@ceramicnetwork/http-client'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect'
import { DID } from 'dids'
import { IDX } from '@ceramicstudio/idx'
import { useEffect, useState } from 'react'

const endpoint = "https://ceramic-clay.3boxlabs.com"

const useIdx = (address?: string) => {
  const [idx, setIdx] = useState<any>(null)

  useEffect(() => {
    const connectToDID = async () => {
      const ceramic = new CeramicClient(endpoint)
      const threeIdConnect = new ThreeIdConnect()
      // Only load DID stuff if connected to blockchain address. Still need to set IDX below
      if (address) {
        const provider = new EthereumAuthProvider((window as any).ethereum, address)
  
        await threeIdConnect.connect(provider)
  
        const did = new DID({
          provider: threeIdConnect.getDidProvider(),
          resolver: {
            ...ThreeIdResolver.getResolver(ceramic)
          }
        })
  
        ceramic.setDID(did)
        await ceramic?.did?.authenticate()
      }
  
      setIdx(new IDX({ ceramic }))
    }

    connectToDID()
  }, [address])
  
  return idx
}

export default useIdx
