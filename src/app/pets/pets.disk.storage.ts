import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';
import * as path from 'path';

export const avatarStorage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images');
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);

    const availableExtension = ['.png', '.jpg', '.jpeg'];
    if (!availableExtension.includes(extension)) {
      return cb(new BadRequestException('file extension unavailable'), null);
    }
    cb(null, `pet-avatar${req.params.id}${extension}`);
  },
});
