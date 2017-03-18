
const Router = require('koa-router')

const router = new Router({ prefix: '/' })

router.get('/', async function (ctx, next) {
  await next()
})


module.exports = router
