const Router = require('koa-router');
const router = new Router();
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

router.get('/', async ctx => {
  const filePath = path.join(__dirname, '../../static/images/404.jpeg');
  const file = fs.readFileSync(filePath);
  const type = mime.lookup(file);
  ctx.set('content-type', type);
  ctx.body = file;
});
module.exports = router;