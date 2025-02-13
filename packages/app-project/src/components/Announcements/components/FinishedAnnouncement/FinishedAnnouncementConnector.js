import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'
import { useTranslation } from 'next-i18next'

import NavLink from '@shared/components/NavLink'
import GenericAnnouncement from '../GenericAnnouncement'

function useStores(mockStore) {
  const stores = useContext(MobXProviderContext)
  const store = mockStore || stores.store

  // TODO: Add a boolean that returns the state of the existence of a results page
  const { baseUrl, isComplete } = store.project

  return {
    baseUrl,
    isVisible: isComplete
  }
}

function FinishedAnnouncementConnector ({ mockStore }) {
  const { t } = useTranslation('components')
  const { 
    baseUrl = '',
    isVisible = false
  } = useStores(mockStore)
  const announcement = t('Announcements.FinishedAnnouncement.announcement')
  const link = {
    href: `${baseUrl}/about/results`,
    text: t('Announcements.FinishedAnnouncement.seeResults')
  }

  if (isVisible) {
    return (
      <GenericAnnouncement
        announcement={announcement}
        color='neutral-3'
      >
        <NavLink color='#000000' link={link} weight='normal' />
      </GenericAnnouncement>
    )
  }

  return null
}

export default observer(FinishedAnnouncementConnector)
export { FinishedAnnouncementConnector }
