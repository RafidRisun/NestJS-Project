import { Module } from '@nestjs/common';
import { AuthAdminService } from './authAdmin.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthAdminController } from './authAdmin.controller';
import { jwtConstants } from './adminconstants';
import { AdminModule } from 'src/admin/admin.module';

@Module({
    imports: [
        AdminModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '30m' },
        }),
    ],
    providers: [AuthAdminService],
    controllers: [AuthAdminController],
    exports: [AuthAdminService],
})
export class AuthAdminModule { }