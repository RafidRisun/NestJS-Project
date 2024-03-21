import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { FaqModule } from './faq/faq.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { BlockingModule } from './blocking/blocking.module';
import config from 'ormconfig';


@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(config), PostsModule, CommentsModule, FaqModule, UserProfileModule, BlockingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  async configure(consumer: import('@nestjs/common').MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({path: 'users', method: (await import('@nestjs/common')).RequestMethod.GET});
  }
}
