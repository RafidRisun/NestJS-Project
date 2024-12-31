import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Admin])],
    exports: [TypeOrmModule, AdminService],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule { }
