const Router = require('koa-router');
const router = new Router();
const { returnMsg, queryFn, jwtVerify } = require('../../../utils');

router.get('/', async ctx => {
  const token = ctx.request.headers['cms-token'];
  if (jwtVerify(token)) {
    const sql = `SELECT username,token,avatar FROM user WHERE token="${token}"`;
    const result = await queryFn(sql);
    ctx.body = returnMsg(0, '请求成功', result[0]);
  } else {
    ctx.body = returnMsg(2, 'token过期或者该用户未注册');
    return;
  }


});

router.post('/', async ctx => {
  const token = ctx.request.headers['cms-token'];
  if (jwtVerify(token)) {
    const { username, password } = ctx.request.body;
    const sql = `UPDATE user SET username='${username}',password='${password}' WHERE token="${token}"`;
    await queryFn(sql);
    const userSql = `SELECT username,token,avatar FROM user WHERE token='${token}'`;
    const result = await queryFn(userSql);

    ctx.body = returnMsg(0, '请求成功', result[0]);
  } else {
    ctx.body = returnMsg(2, 'token过期或者该用户未注册');
    return;
  }
});


module.exports = router;