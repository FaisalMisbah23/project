import { Song } from "src/songs/song.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("artists")
export class Artist {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @ManyToMany(() => Song, (song) => song.artists)
    songs: Song[];
}