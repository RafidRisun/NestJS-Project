import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { CreateAdminDto, loginAdminDTO } from 'src/admin/dto/create-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthAdminService {
    constructor(
        private adminService: AdminService,
        private jwtService: JwtService
    ) { }
    async signUp(myobj: CreateAdminDto): Promise<Object> {
        return await this.adminService.addAdmin(myobj);
    }
    async signIn(logindata: loginAdminDTO): Promise<{ access_token: string }> {
        const admin = await this.adminService.findOne(logindata);
        if (!admin) {
            throw new UnauthorizedException();
        }
        const isMatch = await bcrypt.compare(logindata.password, admin.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        const payload = logindata;
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}