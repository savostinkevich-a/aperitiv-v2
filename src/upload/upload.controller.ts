import { Body, Controller, Get, Header, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from 'multer'

let crypto = require("crypto");

const fs = require('fs')

const {cloudinary} = require('../../utils/cloudinary')

@Controller('upload')
export class UploadController {
    @Post('/products')
    async uploadImage(@Body() fileStr: any): Promise<string> {
        try {
            const uploadedResponse = await cloudinary.uploader.upload(fileStr.data, {
                folder: 'products'
            })
            return JSON.stringify(uploadedResponse.secure_url)
        } catch (e) {
            throw new Error(e)
        }
    }


    // @Post('/products')
    // @UseInterceptors(FileInterceptor('image', {
    //         storage: diskStorage({
    //             destination: './uploads/products',
    //             filename: (req, file, cb) => {
    //                 const prefix = crypto.randomBytes(20).toString('hex');
    //                 cb(null, prefix + '_' + file.originalname)
    //             }
    //         })
    //     }
    // ))
    // uploadFile(@UploadedFile() file) {
    //     return file.filename
    // }

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
        return file.filename
    }

    @Post('/client/delete/:imageName')
    deleteImage(@Param() params): number {
        const path = `./uploads/client/${params.imageName}`
        try {
            fs.unlinkSync(path)
            return 0
        } catch(err) {
            console.error(err)
            return 1
        }
    }
}
