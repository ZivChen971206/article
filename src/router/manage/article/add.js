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
      const { title, subTitle, content } = ctx.request.body;
      if (!title || !content) {
        ctx.body = returnMsg(1, '参数错误');
        return;
      }
      const myDate = moment().format('YYYY-MM-DD hh:mm:ss');
      const addSql = `INSERT INTO article (title,subTitle,author,date,content) VALUES ('${title}','${subTitle}','${res[0].username}','${myDate}','${content}')`;

      await queryFn(addSql);
      ctx.body = returnMsg(0, '添加成功');


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