import { useState } from 'react'

import { ClusterButton, WalletButton } from '@/components/solana/solana-provider'
import { ThemeSelect } from '@/components/theme-select'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router'

export function AppHeader({ links = [] }: { links: { label: string; path: string }[] }) {
  const { pathname } = useLocation()
  const [showMenu, setShowMenu] = useState(false)

  function isActive(path: string) {
    return path === '/' ? pathname === '/' : pathname.startsWith(path)
  }

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center min-h-[40px]">
          {/* Left side: Logo + Navigation */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-xl font-bold text-neutral-900 dark:text-neutral-100 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors leading-none"
            >
              Solana dApp
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-baseline gap-6">
              {links.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 leading-none ${
                    isActive(path) ? 'text-blue-600 dark:text-blue-400' : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side: Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <WalletButton size="sm" />
              <ClusterButton size="sm" />
              <ThemeSelect />
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowMenu(!showMenu)}>
              {showMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMenu && (
          <div className="md:hidden mt-4 pb-4 border-t border-neutral-200 dark:border-neutral-800">
            <nav className="flex flex-col gap-4 pt-4">
              {links.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                    isActive(path) ? 'text-blue-600 dark:text-blue-400' : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                  onClick={() => setShowMenu(false)}
                >
                  {label}
                </Link>
              ))}

              <div className="flex flex-col gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <WalletButton />
                <ClusterButton />
                <ThemeSelect />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
