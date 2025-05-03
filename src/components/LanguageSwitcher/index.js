import React from 'react'
import { useRouter } from 'next/router'
import * as S from './styled'

const LanguageSwitcher = () => {
  const router = useRouter()
  const { locale, asPath, pathname, query } = router

  const getLocalizedPath = newLocale => {
    // Special case for home page
    if (pathname === '/' || pathname === '/[locale]') {
      return `/${newLocale}`
    }

    // For dynamic routes like [slug].js
    if (pathname.includes('[slug]')) {
      // Extract the slug from the current path
      const slugMatch = asPath.match(/\/[^/]+\/([^/]+)/)
      const slug = slugMatch ? slugMatch[1] : ''

      if (slug) {
        return `/${newLocale}/${slug}`
      }
    }

    // For other static pages, use the last part of the pathname
    const pathSegments = asPath.split('/')
    const lastSegment = pathSegments[pathSegments.length - 1]

    // Handle case where there might be query params
    const cleanSegment = lastSegment.split('?')[0]

    if (cleanSegment && cleanSegment !== locale) {
      return `/${newLocale}/${cleanSegment}`
    }

    // Default case, just use the locale
    return `/${newLocale}`
  }

  const changeLanguage = newLocale => {
    // Set a cookie to remember the locale preference
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${
      60 * 60 * 24 * 365
    }` // 1 year

    // Get the correct path for the new locale
    const newPath = getLocalizedPath(newLocale)

    // Use hard navigation to force a full page reload
    window.location.href =
      newPath +
      (router.asPath.includes('?')
        ? router.asPath.substring(router.asPath.indexOf('?'))
        : '')
  }

  return (
    <S.LanguageSwitcherWrapper>
      <S.LanguageButton
        active={locale === 'br'}
        onClick={() => changeLanguage('br')}
        aria-label="Mudar para Português"
      >
        🇧🇷 PT
      </S.LanguageButton>
      <S.LanguageButton
        active={locale === 'en'}
        onClick={() => changeLanguage('en')}
        aria-label="Switch to English"
      >
        🇺🇸 EN
      </S.LanguageButton>
    </S.LanguageSwitcherWrapper>
  )
}

export default LanguageSwitcher
