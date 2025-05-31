import { Book } from "src/books/entities/book.entity";
import { Column, Entity,PrimaryGeneratedColumn,OneToMany} from "typeorm";

export  enum Status{
    TRUE='true',
    FALSE='false',

}

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({ length: 100 })
    name:string;
    @Column({ length: 1000, nullable: true })
    bio:string;
    @Column('date',{nullable: true})
    dateOfBirth:string;
    @Column({type:'enum',enum:Status,default:Status.TRUE})
    isActive:Status;

    @OneToMany(() => Book,(book) => book.authors)
    book:Book[]

}
