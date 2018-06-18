import menuList from '@/components/menu/menuList'

const router = [
  {
    path: 'menu',
    component: {
      template: `
        <div>
          <router-view />
        </div>
        `
    },
    children: [
      // 菜单列表
      {
        path: 'list',
        component: menuList
      }
    ]
  }
]

export default router
