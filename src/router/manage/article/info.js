const Router = require('koa-router');
const router = new Router();
const { returnMsg, queryFn, jwtVerify } = require('../../../../utils');

router.get('/:id', async ctx => {
  const token = ctx.request.headers['cms-token'];
  if (jwtVerify(token)) {
    const arr = ctx.url.split('/');
    const id = arr[arr.length - 1];
    const sql = `SELECT * FROM article WHERE id=${id}`;
    const result = await queryFn(sql);
    if (result.length > 0) {
      ctx.body = returnMsg(0, '文章列表获取成功', result);
    } else {
      ctx.body = returnMsg(1, '该文章不存在');
    }
  } else {
    ctx.body = returnMsg(1, 'token过期');
  }
});

module.exports = router;