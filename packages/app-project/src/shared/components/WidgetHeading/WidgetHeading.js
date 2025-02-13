import { SpacedText } from '@zooniverse/react-components'
import { Heading } from 'grommet'
import { string } from 'prop-types'
import styled from 'styled-components'

const StyledHeading = styled(Heading)`
  font-size: 14px;
  line-height: 22px;
`

function WidgetHeading ({
  children,
  level = '2'
}) {
  return (
    <StyledHeading level={level} margin='none'>
      <SpacedText
        color={{
          dark: 'light-1',
          light: 'black'
        }}
        weight='bold'
      >
        {children}
      </SpacedText>
    </StyledHeading>
  )
}

WidgetHeading.propTypes = {
  level: string,
  text: string
}

export default WidgetHeading
