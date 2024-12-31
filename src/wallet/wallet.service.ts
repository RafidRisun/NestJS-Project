import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { wallets } from 'src/entities/wallet.entity';
import { walletDto } from 'src/wallet/dto/wallet.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class walletService {
    constructor(

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(wallets)
        private readonly walletRepository: Repository<wallets>,


    ) { }

    async addb(usId: number, cardnumber: number, cvv: number, pin: number, amount: number): Promise<Object> {
        const sender = await this.userRepository.findOneBy({ id: usId });
        const cardNumber = await this.userRepository.findOneBy({ id: cardnumber });
        const cvv1 = await this.userRepository.findOneBy({ id: cvv });
        const pin1 = await this.userRepository.findOneBy({ id: pin });
        const amount1 = await this.userRepository.findOneBy({ id: amount });


        if (!sender) {
            throw new NotFoundException('Sender or receiver not found');
        }


        const senderWallet = await this.walletRepository.findOne({ where: { us: sender } });

        if (!senderWallet) {

            const newWallet = this.walletRepository.create({ us: sender, cardnumber, cvv, pin, amount, balance: amount });
            return await this.walletRepository.save(newWallet);
        } else {

            senderWallet.balance += amount;
            return await this.walletRepository.save(senderWallet);
        }


    }


    async getwallet(usId: number): Promise<wallets | undefined> {
        // Find the user based on usId
        const user = await this.userRepository.findOne({ where: { id: usId } });
        
        if (!user) {
            throw new NotFoundException('User not found');
        }
    
        // Retrieve the wallet for the specific user
        const userWallet = await this.walletRepository.findOne({ where: { us: user }, relations: ['us'] });
    
        if (!userWallet) {
            throw new NotFoundException('Wallet not found for the user');
        }
    
        return userWallet;
    }
    //Sajid
    async countTotalBalance(): Promise<number> {
        const wallets = await this.walletRepository.find();
        const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
        return totalBalance;
    }

}
