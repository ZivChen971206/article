const Router = require('koa-router');
const router = new Router();
const list = require('./list');
const edit = require('./edit');
const info = require('./info');
const remove = require('./remove');
const add = require('./add');




router.use('/list', list.routes(), list.allowedMethods());
router.use('/edit', edit.routes(), edit.allowedMethods());
router.use('/info', info.routes(), info.allowedMethods());
router.use('/delete', remove.routes(), remove.allowedMethods());
router.use('/add', add.routes(), add.allowedMethods());

module.exports = router;