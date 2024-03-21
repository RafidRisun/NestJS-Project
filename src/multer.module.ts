import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import * as fs from 'fs';

const uploadFolder = './upload';
if(!fs.existsSync(uploadFolder)){
    fs.mkdirSync(uploadFolder);
}

@Module({
    imports: [MulterModule.register({
        dest: './upload',
    })],
})

export class MulterConfigureModule{}