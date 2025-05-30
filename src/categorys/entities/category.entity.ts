import { Book } from "src/books/entities/book.entity";
import { Column, Entity,PrimaryGeneratedColumn,Relation,ManyToMany } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    description:string;

    @ManyToMany(() => Book, (book) => book.categories)
    books: Relation<Book[]>;
    }

