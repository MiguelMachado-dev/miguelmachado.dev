import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import NextNProgress from 'nextjs-progressbar'

import * as gtag from 'lib/gtag'
import { DefaultSeo } from 'next-seo'
import SEO from '../../next-seo.config'
import Analytics from 'components/Analytics'

import Layout from 'components/Layout'
import GlobalStyles from 'styles/global'

function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <title>Miguel Machado</title>
        <link rel="shortcut icon" href="/assets/img/mmcoding-icon.png" />
        <link
          rel="apple-touch-icon"
          href="/assets/img/mmcoding-icon.png"
        />
        <meta name="theme-color" content="#06092B" />
        <meta
          name="google-site-verification"
          content="oE3XVHeqsZYUvoTWWz18XYWcBonHnhWeK9vpPScmJKw"
        />
        <meta
          name="description"
          content="Desenvolvedor Front End do Brasil, escrevo sobre JavaScript, CSS, Next.JS e muito mais! Vercel Community Leader!"
        />
        <link
          href="https://unpkg.com/prism-theme-night-owl@1.4.0/build/style.css"
          rel="stylesheet"
        />
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <DefaultSeo {...SEO} />
      <GlobalStyles />
      <Layout>
        <NextNProgress
          color="#61ffca"
          startPosition={0.3}
          stopDelayMs={200}
          height={5}
          showSpinner={false}
        />
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </>
  )
}

export default App
