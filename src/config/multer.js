const aws = require('aws-sdk')
const crypto = require('crypto')
const multerS3 = require('multer-s3')

const s3 = new aws.S3()

module.exports = {
  storage: multerS3({
    s3: s3,
    bucket: 'photo-upload-api-dogs',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err)

        const filename = `${hash.toString('hex')}-${file.originalname}`

        cb(null, filename)
      })
    },
  }),
}
