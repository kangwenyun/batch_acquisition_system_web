import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ChangePasswd from '@/components/ChangePasswd'
import CheckAllBatch from '@/components/CheckAllBatch'
import CheckUnderReviewBatch from '@/components/CheckUnderReviewBatch'
import CheckAcceptanceBatch from '@/components/CheckAcceptanceBatch'
import CheckFinishedBatch from '@/components/CheckFinishedBatch'
import Level from '@/components/Level'
import Log from '@/components/Log'
import PerInfo from '@/components/PerInfo'
import ProLine from '@/components/ProLine'
import ProDataView from '@/components/ProDataView'
import ProDataMaintain from '@/components/ProDataMaintain'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/proline',
      name: 'ProLine',
      component: ProLine
    },
    {
      path: '/checkallbatch',
      name: 'CheckAllBatch',
      component: CheckAllBatch
    },
    {
      path: '/checkacceptancebatch',
      name: 'CheckAcceptanceBatch',
      component: CheckAcceptanceBatch
    },
    {
      path: '/checkunderreviewbatch',
      name: 'CheckUnderReviewBatch',
      component: CheckUnderReviewBatch
    },
    {
      path: '/checkfinishedbatch',
      name: 'CheckFinishedBatch',
      component: CheckFinishedBatch
    },
    {
      path: '/prodataview',
      name: 'ProDataView',
      component: ProDataView
    },
    {
      path: '/prodatamaintain',
      name: 'ProDataMaintain',
      component: ProDataMaintain
    },
    {
      path: '/log',
      name: 'Log',
      component: Log
    },
    {
      path: '/level',
      name: 'Level',
      component: Level
    },
    {
      path: '/perinfo',
      name: 'PerInfo',
      component: PerInfo
    },
    {
      path: '/changepasswd',
      name: 'ChangePasswd',
      component: ChangePasswd
    }
  ]
})
