import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "src/users/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Posts extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({nullable: false, type: 'varchar', length: 200})
    title: string;

    @ApiProperty()
    @Column({nullable: false, type: 'varchar', length: 200})
    subtitle: string;

    @ApiProperty()
    @Column({nullable: false, type: 'varchar', length: 20000})
    content: string;

    @ApiProperty()
    @Column({nullable: false, type: 'varchar', length: 200})
    author: string;

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @CreateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.posts)
    user: User;
}