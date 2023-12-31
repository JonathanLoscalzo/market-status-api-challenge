import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { CRYPTO_CURRENCY } from 'src/core/enums/crypto-currency.enum';

export class TransactionPairDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(CRYPTO_CURRENCY)
  buyer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(CRYPTO_CURRENCY)
  seller: string;
}
