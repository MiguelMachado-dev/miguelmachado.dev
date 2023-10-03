import React, { useEffect, useState } from 'react'
import Giscus from '@giscus/react'

import * as S from './styled'

const Comments = () => {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    // return if on server-side
    if (typeof window === 'undefined') return

    function handleThemeChange() {
      console.log('theme changed')
      // get theme value from window.__theme
      const theme = window.__theme

      // set theme value to 'light' or 'dark'
      const themeValue = theme === 'light' ? 'light' : 'dark'
      // save theme value to use it in component
      setTheme(themeValue)
    }

    window.addEventListener('themeChanged', handleThemeChange)

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('themeChanged', handleThemeChange)
    }
  }, [])

  return (
    <S.CommentsWrapper>
      <Giscus
        id="comments"
        repo="MiguelMachado-dev/miguelmachado.dev"
        repoId="R_kgDOHKUBhw"
        category="General"
        categoryId="DIC_kwDOHKUBh84CZ1ie"
        mapping="title"
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === 'dark' ? 'dark' : 'light'}
        lang="pt"
        loading="lazy"
      />
    </S.CommentsWrapper>
  )
}
export default Comments
