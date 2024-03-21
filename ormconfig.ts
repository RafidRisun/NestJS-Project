import { Comment } from "src/entities/comment.entity";
import { Faq } from "src/entities/faq.entity";
import { Post } from "src/entities/post.entity";
import { UserProfile } from "src/entities/user-profile.entity";
import { User } from "src/entities/user.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: "postgres",
    database: "campusnet",
    host:  "localhost",
    port: 5432,
    username: 'postgres',
    password: 'admin',
    entities: [User, Post, Comment, Faq, UserProfile],
    synchronize: true,
};

export default config;