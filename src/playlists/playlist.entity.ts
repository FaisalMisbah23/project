// import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// @Entity("playlist")

// export class Playlist{
//     @PrimaryGeneratedColumn()
//     id:number

//     @Column()
//     name:string

//     // each playlist will have multiple songs 
//     @OneToMany(()=>Song,(song)=>song.playlist)
//     songs:Song[];

//     // many playlist can belong to a single user 
//     @ManyToOne(()=>User,(user)=>user.playlists)
//     user:User;

// }

