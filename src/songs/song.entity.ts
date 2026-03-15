// import { Playlist } from "src/playlists/playlist.entity";
// import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// @Entity("songs")
// export class Songs {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     title: string

//     @Column("time")
//     duration:Date

//     @Column("text")
//     lyrics:string



//     @ManyToMany(() => Artist, (artist) => songs, (cascade:))
//     @JoinTable({ name: "songs_artist" })
//     artist: Artist[];

//     // many songs can belong to playlist for each unique user 
//     @ManyToOne(() => Playlist, (playList) => playList.songs)
//     playList: Playlist;




// }
