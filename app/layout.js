import Navbar from './navbar'
import Footer from './Footer'
import styles from './layout.css'
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-bs-theme="primary">
      <head>
      <link rel="icon" href="favicon.ico" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </head>
      <body>
      <title>KaiHeath.com</title>
      <Navbar />
      <main>{children}</main>
      <Footer />
      </body>
    </html>
  )
}