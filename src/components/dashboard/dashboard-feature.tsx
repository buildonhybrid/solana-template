import { ClusterButton, WalletButton } from '@/components/solana/solana-provider.tsx'
import { ThemeSelect } from '@/components/theme-select'
import { useWalletUi } from '@wallet-ui/react'

export default function DashboardFeature() {
  const { account } = useWalletUi()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute top-4 right-4 z-10">
        <ThemeSelect />
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome to Solana
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Get started by connecting your wallet
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 mb-8">
          <WalletButton />
          <ClusterButton />
        </div>

        {account && (
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Connected to {account.address.toString().slice(0, 8)}...{account.address.toString().slice(-4)}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
