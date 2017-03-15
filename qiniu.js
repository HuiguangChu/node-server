const qiniu = require('qiniu');

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'cF9Y0BRGH3m0zTe8UUK1IscaaQKRBO99fNZ9JD2F';
qiniu.conf.SECRET_KEY = 'Dk3H1zi-QMuVec-C03vcGwBNECNGX_xGrL4wFTXF';
const uploadFile = function (uptoken, localFile) {
  const extra = new qiniu.io.PutExtra();
  qiniu.io.putFile(uptoken, localFile, extra, function (err, res) {
    if (!err) {
      // 上传成功， 处理返回值
      console.log(res.hash, res.key, res.persistentId);
    } else {
      // 上传失败， 处理返回代码
      console.log(err);
    }
  });
};

//构建上传策略函数，设置回调的url以及需要回调给业务服务器的数据
const uptoken = function (bucket, domain) {
  const putPolicy = new qiniu.rs.PutPolicy();
  putPolicy.scope = bucket;
  putPolicy.saveKey = "$(fname)";
  putPolicy.mimeLimit = "image/*"
  putPolicy.callbackUrl = domain + '/callback';
  putPolicy.callbackBody = 'filename=$(fname)&filesize=$(fsize)';
  return putPolicy.token();
};

const uploadFileToQiniu = function (bucket, domain, filepath) {
  //构造上传函数
  const token = uptoken(bucket, domain);
  uploadFile(token, filepath);
};

exports.uploadFileToQiniu = uploadFileToQiniu;


