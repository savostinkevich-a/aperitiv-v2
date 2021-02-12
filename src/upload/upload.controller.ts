import {Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from 'multer'

let crypto = require("crypto");

@Controller('upload')
export class UploadController {
    @Post('/products')
    @UseInterceptors(FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/products',
                filename: (req, file, cb) => {
                    const prefix = crypto.randomBytes(20).toString('hex');
                    cb(null, prefix + '_' + file.originalname)
                }
            })
        }
    ))
    uploadFile(@UploadedFile() file) {
        return file.originalname
    }

    @Post('/client')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads/client',
            filename: (req, file, cb) => {
                const prefix = crypto.randomBytes(20).toString('hex');
                cb(null, prefix + '_' + file.originalname)
            }
        })
    }))
    uploadClientFile(@UploadedFile() file) {
        return file.originalName
    }
}
