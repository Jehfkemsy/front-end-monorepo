import sinon from 'sinon'
import { getStaticProps } from '../pages/publications'
import PublicationsAPI from '../src/api/publications'
import mockData from '../src/screens/Publications/PublicationsContainer.mock'

const DATA = mockData

describe('pages > publications > getStaticProps', function () {

  describe('populates the "publicationsData" props from contentful API', function () {
    let getpublicationsDataStub

    afterEach(function () {
      getpublicationsDataStub.restore()
    })

    it('should handle valid API data', async () => {
      getpublicationsDataStub = sinon.stub(PublicationsAPI, 'createPublicationsResponse').callsFake(() => {
        return Promise.resolve(DATA)
      })
      const { props } = await getStaticProps({})
      expect(props).to.deep.equal({
        publicationsData: DATA
      })
    })

    it('should handle empty API reponse', async () => {
      getpublicationsDataStub = sinon.stub(PublicationsAPI, 'createPublicationsResponse').callsFake(() => {
        return Promise.resolve([])
      })
      const { props } = await getStaticProps({})
      expect(props).to.deep.equal({
        publicationsData: []
      })
    })

    it('should throw on API errors', async () => {
      const errorMsg = 'failed to connect to API'
      const mockError = new Error(errorMsg)
      const errorPromise = Promise.reject(mockError)
      getpublicationsDataStub = sinon.stub(PublicationsAPI, 'createPublicationsResponse').returns(errorPromise)
      let actualError
      try {
        const { props } = await getStaticProps({})
      } catch (error) {
        actualError = error
      }
      expect(actualError).to.equal(mockError)
    })
  })
})
