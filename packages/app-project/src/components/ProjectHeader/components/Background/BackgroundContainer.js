import { inject, observer } from 'mobx-react'
import { string } from 'prop-types'
import { Component } from 'react'

import Background from './Background'

function storeMapper (stores) {
  return {
    backgroundSrc: stores.store.project.background.src
  }
}

@inject(storeMapper)
@observer
class BackgroundContainer extends Component {
  render () {
    return (
      <Background
        aria-hidden
        backgroundSrc={this.props.backgroundSrc}
      />
    )
  }
}

BackgroundContainer.propTypes = {
  backgroundSrc: string
}

export default BackgroundContainer
