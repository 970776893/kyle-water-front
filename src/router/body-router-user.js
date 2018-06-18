import userList from '@/components/user/user-list.vue'

const router = [
  {
    path: 'user',
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
        component: userList
      }
    ]
  }
]

export default router
