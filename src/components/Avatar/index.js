import Image from 'next/image'

import * as S from './styled'

const Avatar = () => {
  return (
    <S.AvatarWrapper>
      <Image
        src="https://avatars.githubusercontent.com/u/29252011?v=4"
        alt="Selfie de Miguel no espelho, com visual estiloso, tattoos à mostra e camiseta com arte gráfica."
        width={64}
        height={64}
        quality={100}
      />
    </S.AvatarWrapper>
  )
}

export default Avatar
