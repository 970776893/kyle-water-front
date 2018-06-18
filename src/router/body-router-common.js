import UpdatePasswordComponent from '@/components/common/update-password.vue'

const router = [
  {
    path: 'common',
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
        path: 'updatePassword',
        component: UpdatePasswordComponent
      }
    ]
  }
]

export default router
