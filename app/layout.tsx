import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Undangan Haul Akbar PPC',
  description: 'Bismillah, kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara Haul Akbar Ke 3 Masyaikh Pondok Pesantren Cipasung',
  openGraph: {
    images: ['https://i.ibb.co.com/KcgggzhZ/Desain-tanpa-judul-1.png'] 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
