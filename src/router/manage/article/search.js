const Router = require('koa-router');
const router = new Router();
const { returnMsg, queryFn, jwtVerify } = require('../../../../utils');

router.get('/', async ctx => {
  const token = ctx.request.headers['cms-token'];
  if (jwtVerify(token)) {
    const { content } = ctx.query;
    const sql = `SELECT * FROM article WHERE content LIKE '%${content}%'`;
    const res = await queryFn(sql);
    ctx.body = returnMsg(0, '查询成功', res);


  } else {
    ctx.body = returnMsg(2, '查询用户信息失败');
    return;
  }

});

module.exports = router;