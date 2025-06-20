import {
  createSolanaDevnet,
  createSolanaMainnet,
  createWalletUiConfig,
  WalletUi,
  WalletUiClusterDropdown,
  WalletUiDropdown,
} from '@wallet-ui/react'
import { ReactNode } from 'react'

export { WalletUiClusterDropdown as ClusterButton, WalletUiDropdown as WalletButton }

const config = createWalletUiConfig({
  clusters: [createSolanaMainnet({ urlOrMoniker: 'https://solana-rpc.publicnode.com' }), createSolanaDevnet()],
})

export function SolanaProvider({ children }: { children: ReactNode }) {
  return <WalletUi config={config}>{children}</WalletUi>
}
