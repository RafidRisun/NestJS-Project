import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { walletService } from './wallet.service';
import { walletDto } from 'src/wallet/dto/wallet.dto';
import { wallets } from 'src/entities/wallet.entity';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from 'src/users/auth/auth.guard';

@Controller('wallet')
export class walletController {
    constructor(private readonly walletService: walletService) { }

    @UseGuards(AuthGuard)
    @Post('addbalance')
    async addb(@Body() requestDto: walletDto): Promise<Object> {
        return await this.walletService.addb(requestDto.usId, requestDto.cardnumber, requestDto.cvv, requestDto.pin, requestDto.amount);
    }

    @UseGuards(AuthGuard)
    @Get(':usId/wallet')
    async getwallet(@Param('usId') usId: number): Promise<wallets | undefined> {
        return this.walletService.getwallet(usId);
    }

    


}
