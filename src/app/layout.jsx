import './globals.css'
import { IBM_Plex_Mono } from 'next/font/google'

const ibmPlex = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600', '700']})

export const metadata = {
  title: 'home planet',
  description: 'git-chad',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${ibmPlex.className} bg-[#140e3c]` }>{children}</body>
    </html>
  )
}
