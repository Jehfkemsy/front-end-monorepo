import { shallow } from 'enzyme'

import Head from './Head'

let wrapper

describe('Component > Head', function () {
  before(function () {
    wrapper = shallow(<Head />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a meta `og:url` tag', function () {
    const tag = wrapper.find(`meta[property='og:url']`)
    expect(tag).to.have.lengthOf(1)
  })

  it('should render a meta `og:title` tag', function () {
    const tag = wrapper.find(`meta[property='og:title']`)
    expect(tag).to.have.lengthOf(1)
  })

  it('should render a meta `og:description` tag', function () {
    const tag = wrapper.find(`meta[property='og:description']`)
    expect(tag).to.have.lengthOf(1)
  })

  it('should render a meta `twitter:site` tag', function () {
    const tag = wrapper.find(`meta[name='twitter:site']`)
    expect(tag).to.have.lengthOf(1)
  })

  it('should render a meta `twitter:card` tag', function () {
    const tag = wrapper.find(`meta[name='twitter:card']`)
    expect(tag).to.have.lengthOf(1)
    expect(tag.prop('content')).to.equal('summary')
  })
})
