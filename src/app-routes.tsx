import { lazy } from 'react'
import { useRoutes } from 'react-router'

const DashboardFeature = lazy(() => import('@/components/dashboard/dashboard-feature'))
const AccountFeature = lazy(() => import('@/components/account/account-feature-index.tsx'))
const AccountDetailFeature = lazy(() => import('@/components/account/account-feature-detail.tsx'))

export function AppRoutes() {
  return useRoutes([
    // Home page
    {
      index: true,
      element: <DashboardFeature />,
    },

    // Account management pages
    {
      path: 'account',
      element: <AccountFeature />,
    },
    {
      path: 'account/:address',
      element: <AccountDetailFeature />,
    },
  ])
}
