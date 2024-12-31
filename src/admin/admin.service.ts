import { Injectable } from '@nestjs/common';
import { CreateAdminDto, loginAdminDTO } from './dto/create-admin.dto';
import { Like, Repository } from 'typeorm';
import { Admin } from 'src/entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
    ) { }

    async addAdmin(myobj: CreateAdminDto): Promise<Object> {
        return await this.adminRepo.save(myobj);
    }
    async findOne(logindata: loginAdminDTO): Promise<any> {
        return await this.adminRepo.findOneBy({ email: logindata.email });
    }

    async findbyEmail(email: string) {
        return await this.adminRepo.findOne({ where: { email: email } });
    }



}
