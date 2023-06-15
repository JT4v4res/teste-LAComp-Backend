import { BaseEntity, Entity, Unique, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Posts } from "src/posts/posts.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({nullable: false, type: 'varchar', length: 200})
    email: string;

    @ApiProperty()
    @Column({nullable: false, type: 'varchar', length: 200})
    name: string;

    @ApiProperty()
    @Column({nullable: false, type: 'varchar', length: 20})
    role: string;

    @ApiProperty()
    @Column({nullable: false})
    password: string;

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @CreateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Posts, posts => posts.user)
    posts: Posts[]
}