import { shallow } from 'enzyme'
import sinon from 'sinon'
import auth from 'panoptes-client/lib/auth'

import ZooHeaderWrapperContainer from './ZooHeaderWrapperContainer'

let wrapper

xdescribe('Component > ZooHeaderWrapperContainer', function () {
  const user = {
    id: 'test',
    clear: sinon.stub()
  }

  before(function () {
    sinon.stub(auth, 'signOut').callsFake(() => Promise.resolve())
    wrapper = shallow(<ZooHeaderWrapperContainer.wrappedComponent
      user={user}
    />)
  })

  after(function () {
    auth.signOut.restore()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should clear the user prop on sign out', function (done) {
    wrapper.instance().signOut().then(function () {
      expect(user.clear).to.have.been.calledOnce()
    })
      .then(done, done)
  })

  it('should remove already seen subjects session storage', async function () {
    window.sessionStorage.setItem("subjectsSeenThisSession", JSON.stringify(["1234/5678"]))
    await wrapper.instance().signOut()
    expect(window.sessionStorage.getItem("subjectsSeenThisSession")).to.be.null()
  })
})
