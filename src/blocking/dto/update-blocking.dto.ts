import { PartialType } from '@nestjs/mapped-types';
import { CreateBlockingDto } from './create-blocking.dto';

export class UpdateBlockingDto extends PartialType(CreateBlockingDto) {}
