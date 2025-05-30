import { Book } from "src/books/entities/book.entity";
import { Status } from "src/users/entities/user.entity";
import { Column, Entity,PrimaryGeneratedColumn,OneToMany } from "typeorm";

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    bio:string;
    @Column('date')
    dateOfBirth:string;
    @Column({type:'enum',enum:Status,default:Status.TRUE})
    isActive:Status;

    @OneToMany(() => Book,(book) => book.authors)
    book:Book[]

}
