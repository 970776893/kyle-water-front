import LoginComponent from '@/components/login/login'
import FooterComponent from '@/components/base/footer'
import RegisterComponent from '@/components/login/register'
import GetbackPasswdComponent from '@/components/login/getback-passwd'

var lauoutRouter = [
  // 登录页
  {
    path: '/login',
    components: {
      body: LoginComponent,
      footer: FooterComponent
    }
  },
  // 注册
  {
    path: '/register',
    components: {
      body: RegisterComponent,
      footer: FooterComponent
    }
  },
  // 找回密码
  {
    path: '/getbackPasswd',
    components: {
      body: GetbackPasswdComponent,
      footer: FooterComponent
    }
  }
]

export default lauoutRouter
