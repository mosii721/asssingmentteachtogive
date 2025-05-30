import { Book } from "src/books/entities/book.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn,Check,ManyToOne,Relation } from "typeorm";

@Entity()
export class Bookreview {
    
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    content:string;

    @Column({ type: 'int', nullable: true })
    @Check(`"rating" >= 0 AND "rating" <= 5`)
    rating:number;

    @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP'})
    createdAt:Date;

    @ManyToOne(()=>User,(user)  => user.bookreview)
    users:Relation<User>

    @ManyToOne(()=>Book,(book)  => book.bookreview)
    books:Relation<Book>
}
