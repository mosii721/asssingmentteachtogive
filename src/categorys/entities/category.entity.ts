import { Book } from "src/books/entities/book.entity";
import { Column, Entity,PrimaryGeneratedColumn,Relation,ManyToMany } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id:number;
    @Column({ length: 50 })
    name:string;
    @Column({ type: 'text',length: 50, nullable: true })
    description:string;

    @ManyToMany(() => Book, (book) => book.categories)
    books: Relation<Book[]>;
    }

