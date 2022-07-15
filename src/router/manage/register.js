const Router = require('koa-router');
const router = new Router();
const { returnMsg, queryFn } = require('../../../utils');

router.post('/', async ctx => {
  const { username, password } = ctx.request.body;
  const sql = `SELECT * FROM user WHERE username='${username}'`;
  if (username && password) {
    const result = await queryFn(sql);
    if (result.length > 0) {
      ctx.body = returnMsg(2, '注册失败', '该用户已注册');
    } else {
      const insertSql = `INSERT INTO user VALUES (null,'${username}',${password},null,'defaultAvatar.jpeg','normal',0)`;
      await queryFn(insertSql);
      ctx.body = returnMsg(0, '注册成功');
    }
  } else {
    ctx.body = returnMsg(1, '请求失败', '参数错误');
  }
});

module.exports = router;