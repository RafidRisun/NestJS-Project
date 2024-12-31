import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
    ParseIntPipe,
    ValidationPipe,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto, loginAdminDTO } from './dto/create-admin.dto';
import { Admin } from 'src/entities/admin.entity';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('findAdminByEmail/:email')
    async findAdminByEmail(@Param('email') email: string): Promise<Object> {
        const admin = await this.adminService.findbyEmail(email);
        return admin;
    }

}
