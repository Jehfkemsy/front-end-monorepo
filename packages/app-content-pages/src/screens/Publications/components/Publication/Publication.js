import { Media, ZooniverseLogo } from '@zooniverse/react-components'
import { Anchor, Box } from 'grommet'
import { string } from 'prop-types'
import styled from 'styled-components'

const StyledBox = styled(Box)`
  border-radius: 5px;
  overflow: hidden;
`

const Placeholder = (
  <Box
    align='center'
    justify='center'
    background='brand'
    height='100%'
    width='100%'
  >
    <ZooniverseLogo size='50%' />
  </Box>
)

function Publication (props) {
  const { authors, avatarSrc, className, title, url, year } = props
  const displayString = [title, authors, year].filter(v => v).join(', ')

  return (
    <Box
      className={className}
      direction='row'
      gap='small'
      margin={{ bottom: 'small' }}
    >
      <StyledBox height='50px' width='50px' flex={false}>
        {!avatarSrc && Placeholder}
        {avatarSrc && (
          <Media
            height={50}
            src={avatarSrc}
            placeholder={Placeholder}
          />
        )}
      </StyledBox>
      <Box direction='column' gap='xxsmall'>
        <Anchor size='medium' href={url}>
          {displayString}
        </Anchor>
      </Box>
    </Box>
  )
}

Publication.propTypes = {
  authors: string,
  avatarSrc: string,
  className: string,
  title: string,
  url: string,
  year: string
}

export default Publication
