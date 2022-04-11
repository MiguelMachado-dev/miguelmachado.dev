import { NextSeo } from 'next-seo'

import { MainContent } from 'styles/base'

const AboutPage = () => (
  <>
    <NextSeo
      title="Sobre mim | Miguel Machado"
      description="Saiba um pouco mais sobre o desenvolvedor por trás deste blog."
      openGraph={{
        type: 'website',
        locale: 'en_US',
        url: 'https://miguelmachado.dev',
        site_name: 'Miguel Machado',
        title: 'Miguel Machado',
        images: [
          {
            url: 'https://miguelmachado.dev/assets/img/blog-photo.png',
            width: 1200,
            height: 630,
            alt: 'Miguel Machado Blog'
          }
        ]
      }}
    />
    <MainContent>
      <h1>Sobre mim</h1>
    </MainContent>
  </>
)

export default AboutPage
