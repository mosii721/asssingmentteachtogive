import { Author } from "src/authors/entities/author.entity";
import { Bookreview } from "src/bookreviews/entities/bookreview.entity";
import { Category } from "src/categorys/entities/category.entity";
import { Column, Entity,ManyToOne,PrimaryGeneratedColumn,Relation,OneToMany,ManyToMany,JoinTable } from "typeorm";

export  enum Status{
    TRUE='true',
    FALSE='false',

}

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({ length: 200 })
    title:string;
    @Column({ length: 2000 })
    description:string;
    @Column('date')
    publicationYear:string;
    @Column({type:'enum',enum:Status,default:Status.TRUE})
    isAvailable:Status;

    @ManyToOne(()=>Author,(author)  => author.book)
    authors:Relation<Author>

    @OneToMany(() => Bookreview,(bookreview) => bookreview.books)
    bookreview:Bookreview[]

    @ManyToMany(() => Category, (category) => category.books)
    @JoinTable() 
    categories: Relation<Category[]>;
}
