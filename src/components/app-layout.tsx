import { ClusterChecker } from '@/components/cluster/cluster-ui'
import React from 'react'
import { ThemeProvider } from './theme-provider'
import { Toaster } from './ui/sonner'

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="min-h-screen">
        <main>
          <ClusterChecker>{children}</ClusterChecker>
        </main>
      </div>
      <Toaster />
    </ThemeProvider>
  )
}
