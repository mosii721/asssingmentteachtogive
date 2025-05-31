import { Bookreview } from "src/bookreviews/entities/bookreview.entity";
import { Profile} from "src/profiles/entities/profile.entity";
import { Column,JoinColumn , Entity,OneToOne,PrimaryGeneratedColumn, Relation,OneToMany } from "typeorm";

export  enum Status{
    TRUE='true',
    FALSE='false',

}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({ length: 50 })
    name:string;
    @Column({ unique: true })
    email:string;
    @Column()
    password:string;
    @Column({type:'enum',enum:Status,default:Status.TRUE})
    isActive:Status;

    @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP'})
    createdAt:Date;

    @Column({type:'timestamp', default:() => 'CURRENT_TIMESTAMP',onUpdate:'CURRENT_TIMESTAMP'})
    updatedAt:Date;

    @OneToOne(() => Profile, (profile)  =>  profile.user, {
        cascade:true,
        onDelete:'CASCADE',
    })
    @JoinColumn()
    profile:Relation<Profile>

    @OneToMany(() => Bookreview,(bookreview) => bookreview.users)
    bookreview:Bookreview[]
}
