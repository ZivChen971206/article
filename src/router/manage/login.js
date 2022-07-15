const Router = require('koa-router');
const router = new Router();
const jwt = require('jsonwebtoken');
const { returnMsg, queryFn } = require('../../../utils');

router.post('/', async ctx => {
  const { username, password } = ctx.request.body;
  if (username && password) {
    const sql = `SELECT * FROM user WHERE username='${username}'`;
    const result = await queryFn(sql);
    if (result.length > 0) {
      const token = jwt.sign(
        { username, password },
        'secret',
        { expiresIn: 60 * 60 }
      );
      const tokenSql = `UPDATE user SET token='${token}' WHERE username='${username}'`;
      await queryFn(tokenSql);
      let res = await queryFn(sql);
      let data = {
        username: res[0].username,
        'cms-token': res[0].token,
        avatar: res[0].avatar,
        player: res[0].player,
        editable: res[0].editable
      };
      ctx.body = returnMsg(0, '登录成功', data);
    } else {
      ctx.body = returnMsg(2, '用户不存在');
    }
  } else {
    ctx.body = returnMsg(1, '参数错误');
  }
});

module.exports = router;