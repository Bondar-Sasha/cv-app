import {StyledButton} from '@/Shared'
import {FC} from 'react'
import {useTranslation} from 'react-i18next'

interface StyledButtonWrapperProps {
  title: string
}

const StyledButtonWrapper: FC<StyledButtonWrapperProps> = ({title}) => {
  const {t} = useTranslation()
  return (
    <StyledButton
      sx={(theme) => ({
        minWidth: '220px',
        height: '48px',
        borderColor: theme.palette.text.secondary,
      })}
      variant={title === 'Confirm' ? 'contained' : 'outlined'}
    >
      {t(title)}
    </StyledButton>
  )
}

export default StyledButtonWrapper
