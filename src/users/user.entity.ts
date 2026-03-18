import { Exclude } from "class-transformer";
import { Playlist } from "src/playlists/playlist.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique:true})
    email: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    @Exclude()
    password: string

    // a user can create many playlists
    @OneToMany(() => Playlist, (playlist) => playlist.user)
    playLists: Playlist[];
}