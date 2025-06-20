import { Button } from '@/components/ui/button'
import { useWalletUi } from '@wallet-ui/react'
import { getExplorerLink, GetExplorerLinkArgs } from 'gill'
import { ReactNode } from 'react'
import { useClusterVersion } from './use-cluster-version'

export function ExplorerLink({
  className,
  label = '',
  ...link
}: GetExplorerLinkArgs & {
  className?: string
  label: string
}) {
  const { cluster } = useWalletUi()
  return (
    <a
      href={getExplorerLink({ ...link, cluster: cluster.cluster })}
      target="_blank"
      rel="noopener noreferrer"
      className={className ? className : `link font-mono`}
    >
      {label}
    </a>
  )
}

export function ClusterChecker({ children }: { children: ReactNode }) {
  const { cluster } = useWalletUi()
  const query = useClusterVersion()

  if (query.isLoading) {
    return null
  }

  if (query.isError || !query.data) {
    return (
      <div className="mb-4 p-4 border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded-lg">
        <p className="text-red-800 dark:text-red-200">
          Error connecting to cluster <span className="font-bold">{cluster.label}</span>.
        </p>
        <Button variant="outline" onClick={() => query.refetch()} className="mt-2">
          Refresh
        </Button>
      </div>
    )
  }
  return children
}
