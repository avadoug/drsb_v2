import path from 'path'
import express from 'express'
import multer from 'multer'
import aws from 'aws-sdk'
import multerS3 from 'multer-s3'
const router = express.Router()
import dotenv from "dotenv";
dotenv.config();



aws.config.update({
  secretAccessKey: `${process.env.S3_ACCESS}`,
  accessKeyId: `${process.env.S3_KEY_ID}`,
  region: 'us-east-2'
});
const s3 = new aws.S3();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     )
//   },
// })

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

  const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'dankrealm',
        acl: 'public-read',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, `uploads/${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`); //use Date.now() for unique file keys
        }
    })
});


// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: 'bucket-name',
//         key: function (req, file, cb) {
//             console.log(file);
//             cb(null, file.originalname); //use Date.now() for unique file keys
//         }
//     })
// });

router.post('/', upload.single('image'), (req, res) => {
  res.send(`${req.file.location}`)
  console.log(req.file.location)
})

export default router
