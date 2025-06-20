import { AppLayout } from '@/components/app-layout.tsx'
import { AppProviders } from '@/components/app-providers.tsx'
import DashboardFeature from '@/components/dashboard/dashboard-feature'

export function App() {
  return (
    <AppProviders>
      <AppLayout>
        <DashboardFeature />
      </AppLayout>
    </AppProviders>
  )
}
