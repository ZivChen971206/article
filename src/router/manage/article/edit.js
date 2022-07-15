const Router = require('koa-router');
const router = new Router();
const { returnMsg, queryFn, jwtVerify } = require('../../../../utils');
const moment = require('moment');

router.post('/', async ctx => {
  const token = ctx.request.headers['cms-token'];
  if (jwtVerify(token)) {
    const tokenSql = `SELECT editable,username FROM user WHERE token='${token}'`;
    const res = await queryFn(tokenSql);
    if (res[0].editable === 1) {
      const myDate = moment().format('YYYY-MM-DD hh:mm:ss');
      const { id, title, subTitle, content } = ctx.request.body;
      const sql = `SELECT * FORM article WHERE id=${id}`;
      const result = await queryFn(sql);
      if (result.length > 0) {
        const updateSql = `UPDATE article SET title='${title}',subTitle='${subTitle}',content='${content}',date='${myDate}',author='${res[0].userame}' WHERE id=${id}`;
        await queryFn(updateSql);
        const res = await queryFn(sql);
        ctx.body = returnMsg(0, '文章修改成功', res);
      } else {
        ctx.body = returnMsg(1, '文章不存在', result);
      }
    } else {
      ctx.body = returnMsg(1, '该用户没有编辑权限');
      return;
    }

  } else {
    ctx.body = returnMsg(2, '查询用户信息失败');
    return;
  }

});

module.exports = router;