import { dirname, extname } from 'path';
import { nanoid } from 'nanoid';
import Multer from 'multer';

const storage = Multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(dirname(require.main.path) + '/uploads');

    cb(null, dirname(require.main.path) + '/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, nanoid() + '-' + Date.now() + extname(file.originalname));
  },
});

const multer = Multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 10, files: 1 },
});

export default multer;
