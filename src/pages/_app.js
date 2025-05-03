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
  const { locale, defaultLocale, locales, asPath } = router

  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  // Extract the path without the locale prefix for use in hreflang tags
  const getPathWithoutLocale = () => {
    if (asPath === '/') return ''

    // Check if the path starts with a locale
    const pathWithoutQuery = asPath.split('?')[0]
    const segments = pathWithoutQuery.split('/')

    // If the first segment is a locale, remove it
    if (segments.length > 1 && locales.includes(segments[1])) {
      return pathWithoutQuery.replace(`/${segments[1]}`, '') || ''
    }

    return pathWithoutQuery
  }

  const pathWithoutLocale = getPathWithoutLocale()

  return (
    <>
      <Head>
        <title>Miguel Machado</title>
        <link rel="shortcut icon" href="/assets/img/mmcoding-icon.png" />
        <link rel="apple-touch-icon" href="/assets/img/mmcoding-icon.png" />
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
          href="https://unpkg.com/prism-theme-night-owl@1.4.0/build/no-italics.css"
          rel="stylesheet"
        />
        <link href="https://mastodon.social/@theMigtito" rel="me" />
        <link rel="manifest" href="/manifest.json" />

        {/* Add hreflang tags for SEO */}
        <link
          rel="alternate"
          hrefLang="br"
          href={`https://miguelmachado.dev/br${pathWithoutLocale}`}
        />
        <link
          rel="alternate"
          hrefLang="en"
          href={`https://miguelmachado.dev/en${pathWithoutLocale}`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`https://miguelmachado.dev/br${pathWithoutLocale}`}
        />

        {/* Add canonical link with proper locale prefix */}
        <link
          rel="canonical"
          href={`https://miguelmachado.dev/${locale}${pathWithoutLocale}`}
        />
      </Head>
      <DefaultSeo
        {...SEO}
        languageAlternates={[
          {
            hrefLang: 'en',
            href: `https://miguelmachado.dev/en${pathWithoutLocale}`
          },
          {
            hrefLang: 'br',
            href: `https://miguelmachado.dev/br${pathWithoutLocale}`
          },
          {
            hrefLang: 'x-default',
            href: `https://miguelmachado.dev/br${pathWithoutLocale}`
          }
        ]}
      />
      <GlobalStyles />
      <Layout>
        <NextNProgress
          color="#61ffca"
          startPosition={0.3}
          stopDelayMs={200}
          height={4}
          showSpinner={false}
        />
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </>
  )
}

export default App
