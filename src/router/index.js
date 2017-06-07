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
import Framework from '@/components/Framework'
import Review from '@/components/Review'
import ForgetPasswd from '@/components/ForgetPasswd'
import Account from '@/components/Account'

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
      path: '/forgetpasswd',
      name: 'ForgetPasswd',
      component: ForgetPasswd
    },
    {
      path: '/framework/:id',
      name: 'Framework',
      component: Framework,
      meta: { requiresId: true },
      children: [
        {
          path: '/framework/proline',
          name: 'ProLine',
          component: ProLine
        },
        {
          path: '/framework/checkallbatch',
          name: 'CheckAllBatch',
          component: CheckAllBatch
          // meta: { requiresId: true }
        },
        {
          path: '/framework/checkacceptancebatch',
          name: 'CheckAcceptanceBatch',
          component: CheckAcceptanceBatch
          // meta: { requiresId: true }
        },
        {
          path: '/framework/checkunderreviewbatch',
          name: 'CheckUnderReviewBatch',
          component: CheckUnderReviewBatch
          // meta: { requiresId: true }
        },
        {
          path: '/framework/checkfinishedbatch',
          name: 'CheckFinishedBatch',
          component: CheckFinishedBatch
          // meta: { requiresId: true }
        },
        {
          path: '/framework/prodataview',
          name: 'ProDataView',
          component: ProDataView
          // meta: { requiresId: true }
        },
        {
          path: '/framework/prodatamaintain',
          name: 'ProDataMaintain',
          component: ProDataMaintain
          // meta: { requiresId: true }
        },
        {
          path: '/framework/log',
          name: 'Log',
          component: Log
          // meta: { requiresId: true }
        },
        {
          path: '/framework/account',
          name: 'Account',
          component: Account
          // meta: { requiresId: true }
        },
        {
          path: '/framework/level',
          name: 'Level',
          component: Level
          // meta: { requiresId: true }
        },
        {
          path: '/framework/perinfo',
          name: 'PerInfo',
          component: PerInfo
          // meta: { requiresId: true }
        },
        {
          path: '/framework/changepasswd',
          name: 'ChangePasswd',
          component: ChangePasswd
          // meta: { requiresId: true }
        },
        {
          path: '/framework/review',
          name: 'Review',
          component: Review
          // meta: { requiresId: true }
        }
      ]
    }
  ]
})
