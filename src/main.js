const Koa = require('koa2');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const { port, host } = require('../utils');
const manage = require('./router/manage');
const nomatch = require('./router/404');
const cors = require('koa2-cors');
const static = require('koa-static');
const path = require('path');
const bodyParser = require('koa-bodyparser');

router.get('/', async ctx => {
  ctx.body = '首页数据';
});

router.use('/manage', manage.routes(), manage.allowedMethods());
router.use('/404', nomatch.routes(), nomatch.allowedMethods());


app.use(async (ctx, next) => {
  await next();
  if (+ctx.status === 404) {
    ctx.response.redirect('/404');
  }
});
// app.use(cors());
app.use(bodyParser());


app.use(router.routes(), router.allowedMethods());

app.use(static(path.join(__dirname, './static')));
app.use(static(path.join(__dirname, './router/manage/upload')));

app.listen(port, () => {
  console.log(`Server is running at ${host}:${port}`);
});