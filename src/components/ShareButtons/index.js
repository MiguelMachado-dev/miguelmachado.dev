import React from 'react'
import { Twitter } from '@styled-icons/boxicons-logos/Twitter'
import { Linkedin } from '@styled-icons/boxicons-logos/Linkedin'
import { Whatsapp } from '@styled-icons/boxicons-logos/Whatsapp'

import * as S from './styled'

const ShareButtons = ({ title, url }) => {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`

  return (
    <S.ShareButtonsWrapper>
      <S.ShareTitle>Compartilhar:</S.ShareTitle>
      <S.ShareButtonsList>
        <S.ShareButtonsItem>
          <S.ShareButtonsLink
            href={twitterShareUrl}
            title="Compartilhar no Twitter"
            target="_blank"
            rel="noopener noreferrer"
            className="twitter"
          >
            <Twitter />
          </S.ShareButtonsLink>
        </S.ShareButtonsItem>
        <S.ShareButtonsItem>
          <S.ShareButtonsLink
            href={linkedinShareUrl}
            title="Compartilhar no LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin"
          >
            <Linkedin />
          </S.ShareButtonsLink>
        </S.ShareButtonsItem>
        <S.ShareButtonsItem>
          <S.ShareButtonsLink
            href={whatsappShareUrl}
            title="Compartilhar no WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp"
          >
            <Whatsapp />
          </S.ShareButtonsLink>
        </S.ShareButtonsItem>
      </S.ShareButtonsList>
    </S.ShareButtonsWrapper>
  )
}

export default ShareButtons
