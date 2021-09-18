import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: 'Dashboard', icon: 'icon-dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        meta: { title: 'Dashboard', },
        component: () => import('@/views/dashboard/index'),
        meta: { title: '分析页' }
      },
      {
        path: 'monitor',
        name: 'Monitor',
        component: () => import('@/views/dashboard/monitor.vue'),
        meta: { title: '监控页' }
      },
      {
        path: 'workplace',
        name: 'Workplace',
        component: () => import('@/views/dashboard/workplace.vue'),
        meta: { title: '工作台' }
      }
    ]
  },
  {
    path: '/page-demo',
    component: Layout,
    redirect: '/example/table',
    name: 'Page',
    meta: { title: '页面', icon: 'icon-example' },
    children: [
      {
        path: 'form',
        name: 'Page',
        meta: { title: '表单页', },
        children: [
          {
            path: 'basic',
            name: 'PageBasicForm',
            meta: { title: '基础Form' },
            component: () => import('@/views/demo/pages/form/basicForm.vue'),
          },
          {
            path: 'step',
            name: 'PageStepForm',
            meta: { title: '分步表单' },
            component: () => import('@/views/demo/pages/form/basicForm.vue'),
          }
        ]
      },


    ]
  },
  {
    path: '/comp',
    component: Layout,
    redirect: '/comp/table',
    name: 'Components',
    meta: { title: '组件', icon: 'icon-example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        meta: { title: 'Table' },
        component: () => import('@/views/demo/components/table/index'),
        children: [
          {
            path: 'basic',
            name: 'basicTable',
            component: () => import('@/views/demo/components/table/basicTable'),
            meta: { title: '基础示例', icon: 'icon-table' }
          },
          {
            path: 'fetchTable',
            component: () => import('@/views/demo/components/table/fetchTable.vue'),
            name: 'FetchTable',
            meta: { title: '分页示例' }
          },
          {
            path: 'fixedColumn',
            component: () => import('@/views/demo/components/table/fixedColumn.vue'),
            name: 'FixedColumn',
            meta: { title: '固定列' }
          },
          {
            path: 'formTable',
            component: () => import('@/views/demo/components/table/formTable.vue'),
            name: 'FormTable',
            meta: { title: '开启搜索区域' }
          },
          {
            path: 'multipleHeader',
            component: () => import('@/views/demo/components/table/multipleHeader.vue'),
            name: 'MultipleHeader',
            meta: { title: '头部合并' }
          },
          {
            path: 'editCellTable',
            component: () => import('@/views/demo/components/table/editCellTable.vue'),
            name: 'EditCellTable',
            meta: { title: '可编辑单元格' }
          },
        ],
      },
      {
        path: 'form',
        name: 'Form',
        meta: { title: 'Form' },
        component: () => import('@/views/demo/components/form/index'),
        children: [
          {
            path: 'basic',
            name: 'BasicForm',
            component: () => import('@/views/demo/components/form/basicForm.vue'),
            meta: { title: '基础表单' }
          },
          {
            path: 'ruleForm',
            name: 'RuleForm',
            component: () => import('@/views/demo/components/form/ruleForm.vue'),
            meta: { title: '可验证表单' }
          }
        ]
      },
      {
        path: 'card',
        name: 'Card',
        component: () => import('@/views/demo/components/card/index'),
        meta: { title: 'Card' },
        children: [
          {
            path: 'basic',
            name: 'BasicForm',
            component: () => import('@/views/demo/components/card/basicCard.vue'),
            meta: { title: '基础Card' }
          }
        ]
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/demo/components/tree/index.vue'),
        meta: { title: 'Tree' },
        children: [
          {
            path: 'basic',
            name: 'BasicForm',
            component: () => import('@/views/demo/components/tree/basicTree.vue'),
            meta: { title: '基础Tree' }
          }
        ]
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'icon-form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: { title: 'Nested', icon: 'icon-nested' },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'icon-fenxiang' }
      }
    ]
  },
  {
    path: '/demo',
    component: Layout,
    children: [
      {
        path: 'life',
        name: 'Life',
        component: () => import('@/views/life/index.vue'),
        meta: { title: 'demo1 life', icon: 'icon-fenxiang' }
      },
    ]
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
