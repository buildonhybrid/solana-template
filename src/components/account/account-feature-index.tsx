import { AppHero } from '@/components/app-hero'
import { WalletButton } from '@/components/solana/solana-provider.tsx'
import { useWalletUi } from '@wallet-ui/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function AccountFeatureIndex() {
  const { account } = useWalletUi()
  const navigate = useNavigate()

  useEffect(() => {
    if (account) {
      navigate(`/account/${account.address.toString()}`)
    }
  }, [account, navigate])

  if (account) {
    return null // Will redirect via useEffect
  }

  return (
    <div>
      <AppHero title="Account Manager" subtitle="Connect your wallet to view account details and manage your assets" />
      <div className="max-w-md mx-auto py-8 text-center">
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-8 space-y-4">
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Please connect your wallet to access account features
          </p>
          <WalletButton />
        </div>
      </div>
    </div>
  )
}
