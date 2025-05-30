import { User } from "src/users/entities/user.entity";
import { Column, Entity,OneToOne,PrimaryGeneratedColumn, Relation } from "typeorm";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id:number;

    @Column()
    bio:string;
    @Column()
    avatar:string;
    @Column('date')
    dateOfBirth:string;
    @Column()
    location:string;

    @OneToOne(() => User, (user)  =>  user.profile)
    user:Relation<User>
}
