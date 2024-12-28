import type { AppProps } from 'next/app'
import { FirebaseProvider } from '../lib/firebase/FirebaseProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseProvider>
      <Component {...pageProps} />
    </FirebaseProvider>
  )
}

export default MyApp

