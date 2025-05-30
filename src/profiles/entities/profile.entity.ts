import { User } from "src/users/entities/user.entity";
import { Column, Entity,OneToOne,PrimaryGeneratedColumn, Relation } from "typeorm";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id:number;

    @Column({type: 'text', nullable: true })
    bio:string;
    @Column({nullable: true })
    avatar:string;
    @Column('date',{ nullable: true })
    dateOfBirth:string;
    @Column({ nullable: true })
    location:string;

    @OneToOne(() => User, (user)  =>  user.profile)
    user:Relation<User>
}
