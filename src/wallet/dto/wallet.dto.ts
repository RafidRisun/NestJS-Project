import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class walletDto {

    usId: number;




    cardnumber: number;


    cvv: number;


    pin: number;


    amount: number;

    balance: number;
}
