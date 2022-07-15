const Router = require('koa-router');
const router = new Router();
const { returnMsg, queryFn, jwtVerify } = require('../../../../utils');


router.get('/', async ctx => {
  const { num, count, content } = ctx.request.query;

  const sql = `SELECT COUNT(*) FROM article`;
  const coutRes = await queryFn(sql);
  const total = coutRes[0]['COUNT(*)'];
  if (!num || !count) {
    const sql = `SELECT * FROM article `;
    const result = await queryFn(sql);
    ctx.body = returnMsg(0, '查询成功', {
      total,
      arr: result
    });
    return;
  } else if (content !== undefined) {
    const lengthSql = `SELECT COUNT(*) FROM article  WHERE content LIKE '%${content}%'`;
    const searchRes = await queryFn(lengthSql);
    const searchTotal = searchRes[0]['COUNT(*)'];
    const sql = `SELECT * FROM article  WHERE content LIKE '%${content}%' LIMIT ${(num - 1) * count},${count}`;
    const result = await queryFn(sql);
    ctx.body = returnMsg(0, '查询成功', {
      num,
      count,
      total:searchTotal,
      arr: result
    });
  }
  else {
    const sql = `SELECT * FROM article  LIMIT ${(num - 1) * count},${count}`;
    const result = await queryFn(sql);
    ctx.body = returnMsg(0, '查询成功', {
      num,
      count,
      total,
      arr: result
    });
  }

});

module.exports = router;