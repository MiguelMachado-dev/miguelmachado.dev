import Image from 'next/image'

import * as S from './styled'

const Avatar = () => {
  return (
    <S.AvatarWrapper>
      <Image
        src="https://pbs.twimg.com/profile_images/1319261726836166656/VHb9nKyv_400x400.jpg"
        alt="Uma foto minha na praia, usando óculos. Foto tirada de lado, onde estou olhando para o mar."
        width={64}
        height={64}
      />
    </S.AvatarWrapper>
  )
}

export default Avatar
