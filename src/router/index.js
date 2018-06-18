import HeaderComponent from '@/components/base/header'
import FooterComponent from '@/components/base/footer'
import BodyComponent from '@/components/base/body'
import commonRouter from '@/router/body-router-common'
import menuRouter from '@/router/body-router-menu'
import lauoutRouter from '@/router/layout-router'
import userRouter from '@/router/body-router-user'


var childrenRouter = []
childrenRouter = childrenRouter.concat(commonRouter)
childrenRouter = childrenRouter.concat(menuRouter)
childrenRouter = childrenRouter.concat(userRouter)

var routersConfigure = [
  // 增加内容页主页面
  {
    path: '/',
    components: {
      header: HeaderComponent,
      body: BodyComponent,
      footer: FooterComponent
    },
    children: childrenRouter
  }
]
// 增加其他页面
routersConfigure = routersConfigure.concat(lauoutRouter)

export default routersConfigure
