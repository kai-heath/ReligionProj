import Navbar from './navbar'
import Footer from './Footer'
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-bs-theme="primary">
      <body>
      <title>KaiHeath.com</title>
      <Navbar />
      <main>{children}</main>
      </body>
    </html>
  )
}