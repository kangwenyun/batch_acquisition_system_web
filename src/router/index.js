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
      path: '/',
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
      component: ProLine,
      meta: { requiresId: true }
    },
    {
      path: '/checkallbatch',
      name: 'CheckAllBatch',
      component: CheckAllBatch,
      meta: { requiresId: true }
    },
    {
      path: '/checkacceptancebatch',
      name: 'CheckAcceptanceBatch',
      component: CheckAcceptanceBatch,
      meta: { requiresId: true }
    },
    {
      path: '/checkunderreviewbatch',
      name: 'CheckUnderReviewBatch',
      component: CheckUnderReviewBatch,
      meta: { requiresId: true }
    },
    {
      path: '/checkfinishedbatch',
      name: 'CheckFinishedBatch',
      component: CheckFinishedBatch,
      meta: { requiresId: true }
    },
    {
      path: '/prodataview',
      name: 'ProDataView',
      component: ProDataView,
      meta: { requiresId: true }
    },
    {
      path: '/prodatamaintain',
      name: 'ProDataMaintain',
      component: ProDataMaintain,
      meta: { requiresId: true }
    },
    {
      path: '/log',
      name: 'Log',
      component: Log,
      meta: { requiresId: true }
    },
    {
      path: '/level',
      name: 'Level',
      component: Level,
      meta: { requiresId: true }
    },
    {
      path: '/perinfo',
      name: 'PerInfo',
      component: PerInfo,
      meta: { requiresId: true }
    },
    {
      path: '/changepasswd',
      name: 'ChangePasswd',
      component: ChangePasswd,
      meta: { requiresId: true }
    }
  ]
})
