import type React from 'react'

type AppShellProps = {
  children: React.ReactNode
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => (
  <div className='app-shell'>{children}</div>
)
