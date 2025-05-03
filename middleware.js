import { NextResponse } from 'next/server'

const COOKIE_NAME = 'NEXT_LOCALE'
const SUPPORTED_LOCALES = ['en', 'br']

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Don't redirect for API calls or static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('/public/') ||
    pathname.match(/\.(jpg|png|gif|jpeg|svg|ico|json)$/)
  ) {
    return
  }

  // Check if pathname already has a locale prefix
  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // If URL already has a valid locale, we're good - just make sure cookie is set
  if (pathnameHasLocale) {
    // Extract locale from pathname
    const locale = pathname.split('/')[1]

    // Set/update cookie to match URL locale
    const response = NextResponse.next()
    response.cookies.set(COOKIE_NAME, locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365 // 1 year
    })

    return response
  }

  // Determine preferred locale
  let locale

  // 1. Check cookie first
  const cookieLocale = request.cookies.get(COOKIE_NAME)?.value
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
    locale = cookieLocale
  } else {
    // 2. Use accept-language header
    const acceptLanguage = request.headers.get('accept-language')
    if (acceptLanguage) {
      // Parse the Accept-Language header
      const preferredLanguages = acceptLanguage
        .split(',')
        .map(lang => {
          // Extract language code and quality value
          const [code, quality] = lang.split(';q=')
          return {
            code: code.trim().split('-')[0], // Get the primary language tag
            quality: quality ? parseFloat(quality) : 1.0
          }
        })
        .sort((a, b) => b.quality - a.quality) // Sort by quality

      // Find first preferred language that matches a supported locale
      const matchedLocale = preferredLanguages.find(
        lang => SUPPORTED_LOCALES.includes(lang.code) || lang.code === 'pt' // Special case: Map 'pt' to 'br' for Brazilian Portuguese
      )

      if (matchedLocale) {
        locale = matchedLocale.code === 'pt' ? 'br' : matchedLocale.code
      }
    }
  }

  // Default to the default locale from next.config.js if no match
  if (!locale || !SUPPORTED_LOCALES.includes(locale)) {
    locale = 'br'
  }

  // Redirect to the locale-specific URL
  const url = new URL(
    `/${locale}${pathname === '/' ? '' : pathname}`,
    request.url
  )

  // Copy the query parameters
  url.search = request.nextUrl.search

  // Set the locale cookie
  const response = NextResponse.redirect(url)
  response.cookies.set(COOKIE_NAME, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365 // 1 year
  })

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
