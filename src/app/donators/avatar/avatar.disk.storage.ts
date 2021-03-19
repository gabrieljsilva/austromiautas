import { diskStorage } from 'multer';
import { Request } from 'express';

import { Donator } from '../../../shared/database/entities/Donator';

interface RequestCustom extends Request {
  donator: Donator;
}

export const avatarStorage = diskStorage({
  destination: (req: RequestCustom, file, cb) => {
    cb(null, 'uploads/images');
  },

  filename: (req: RequestCustom, file, cb) => {
    const [, extension] = file.mimetype.split('/');
    cb(null, `avatar${req.donator.id}.${extension}`);
  },
});
