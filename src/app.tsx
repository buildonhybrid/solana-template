import { AppRoutes } from '@/app-routes.tsx'
import { AppLayout } from '@/components/app-layout.tsx'
import { AppProviders } from '@/components/app-providers.tsx'

const links: { label: string; path: string }[] = [
  { label: 'Home', path: '/' },
  { label: 'Account', path: '/account' },
]

export function App() {
  return (
    <AppProviders>
      <AppLayout links={links}>
        <AppRoutes />
      </AppLayout>
    </AppProviders>
  )
}
