import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { wallets } from 'src/entities/wallet.entity';
import { walletService } from 'src/wallet/wallet.service';
import { walletController } from 'src/wallet/wallet.controller';
import { User } from 'src/entities/user.entity';


@Module({
    imports: [TypeOrmModule.forFeature([User, wallets])],
    exports: [TypeOrmModule, walletService],
    providers: [walletService],
    controllers: [walletController],
})
export class walletModule { }
