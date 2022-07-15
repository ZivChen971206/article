const Router = require('koa-router');
const router = new Router();
const { returnMsg, queryFn, jwtVerify } = require('../../../../utils');

router.post('/', async ctx => {
  console.log(ctx.request.body);
  const token = ctx.request.headers['cms-token'];
  if (jwtVerify(token)) {
    const tokenSql = `SELECT editable FROM user WHERE token='${token}'`;
    const res = await queryFn(tokenSql);
    if (res[0].editable === 0) {
      const { id } = ctx.request.body;
      const sql = `SELECT * FROM article WHERE id=${id}`;
      const result = await queryFn(sql);
      if (result.length === 0) {
        ctx.body = returnMsg(2, '删除文章不存在');
        return;
      } else {
        const delSql = `DELETE FROM article WHERE id='${id}'`;
        await queryFn(delSql);
        ctx.body = returnMsg(0, '删除成功');

      }
    } else {
      ctx.body = returnMsg(2, '权限不足');
    }
  } else {
    ctx.body = returnMsg(2, 'token过期或者该用户未注册');
    return;
  }
});

module.exports = router;