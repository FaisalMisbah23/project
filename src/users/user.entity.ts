// import { Playlist } from "src/playlists/playlist.entity";
// import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// @Entity("users")

// export class Users {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     email: string

//     @Column()
//     name: string

//     @Column()
//     password: string

//     // a user can create many playlists
//     @OneToMany((Playlist) => Playlist, (playList) => playList.user) playList: Playlist;
// }