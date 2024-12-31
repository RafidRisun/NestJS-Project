import { PartialType } from '@nestjs/mapped-types';
import { CreateForumDto } from './create-forum.dto';

export class UpdateForumDto extends PartialType(CreateForumDto) {}
