const Router = require('koa-router');
const router = new Router();
const { returnMsg, queryFn, jwtVerify } = require('../../../utils');
const multer = require('@koa/multer');
const path = require('path');

let myfilename = '';
const storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/images/'));
  },
  //修改文件名称
  filename: function (req, file, cb) {
    let type = file.originalname.split('.')[1];
    // logo.png -> logo.xxx.png
    myfilename = `${file.fieldname}-${Date.now().toString(16)}.${type}`;
    cb(null, myfilename);
  }
});


const limits = {
  fields: 10,//非文件字段的数量
  fileSize: 200 * 1024,//文件大小 单位 b
  files: 1//文件数量
};
const upload = multer({ storage, limits });

router.post('/', upload.single('avatar'), async ctx => {
  const token = ctx.request.headers['cms-token'];
  if (jwtVerify(token)) {
    const sql = `UPDATE user SET avatar='${myfilename}' WHERE token="${token}"`;
    await queryFn(sql);
    const searchSql = `SELECT username,avatar,token FROM user WHERE token='${token}'`;
    const result = await queryFn(searchSql);
    ctx.body = returnMsg(0, '请求成功', result[0]);
  } else {
    ctx.body = returnMsg(2, 'token过期或者该用户未注册');
  }


});

module.exports = router;