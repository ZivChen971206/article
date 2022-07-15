const Router = require('koa-router');
const router = new Router();
const { returnMsg, queryFn, jwtVerify } = require('../../../utils');


router.get('/', async ctx => {
  const sql = `SELECT username,avatar FROM user`;
  const result = await queryFn(sql);
  ctx.body = returnMsg(0, '查询成功', result);

});

module.exports = router;