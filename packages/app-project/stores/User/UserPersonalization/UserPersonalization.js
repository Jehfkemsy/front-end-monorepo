import asyncStates from '@zooniverse/async-states'
import { addDisposer, getRoot, types } from 'mobx-state-tree'
import { autorun } from 'mobx'

import Notifications from './Notifications'
import UserProjectPreferences from './UserProjectPreferences'
import YourStats from './YourStats'

const UserPersonalization = types
  .model('UserPersonalization', {
    notifications: types.optional(Notifications, {}),
    projectPreferences: types.optional(UserProjectPreferences, {}),
    stats: types.optional(YourStats, {})
  })
  .volatile(self => ({
    sessionCount: 0
  }))
  .views(self => ({
    get counts() {
      const todaysDate = new Date()
      let todaysCount = 0
      try {
        if (self.stats.thisWeek.length === 7) {
          const todaysStats = self.stats.thisWeek.find(stat => stat.dayNumber === todaysDate.getDay())
          todaysCount = todaysStats.count
        }
      } catch (error) {
        todaysCount = 0
      }
      const today = todaysCount + self.sessionCount

      return {
        today,
        total: self.totalClassificationCount
      }
    },

    get sessionCountIsDivisibleByFive() {
      return self.sessionCount % 5 === 0
    },

    get totalClassificationCount() {
      const activityCount = self.projectPreferences?.activity_count || 0
      return  activityCount + self.sessionCount
    }
  }))
  .actions(self => {
    function _onUserChange() {
      const { project, user } = getRoot(self)
      if (user.id) {
        self.notifications.fetchAndSubscribe()
      } else if (user.loadingState === asyncStates.success) {
        self.projectPreferences.setLoadingState(asyncStates.success)
      }
    }

    return {
      afterAttach() {
        addDisposer(self, autorun(_onUserChange))
      },

      increment() {
        self.sessionCount = self.sessionCount + 1

        const { user } = getRoot(self)
        if (user?.id && self.sessionCountIsDivisibleByFive) {
          self.projectPreferences.refreshSettings()
        }
      },

      load() {
        self.projectPreferences.fetchResource()
        self.stats.fetchDailyCounts()
      },

      reset() {
        self.notifications.reset()
        self.projectPreferences.reset()
        self.projectPreferences.setLoadingState(asyncStates.success)
        self.stats.reset()
        self.sessionCount = 0
      }
    }
  })

export default UserPersonalization