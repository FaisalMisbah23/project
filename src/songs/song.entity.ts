// import { Playlist } from "src/playlists/playlist.entity";
import { Artist } from "src/artists/artist.entity";
import { Playlist } from "src/playlists/playlist.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("songs")
export class Song {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    // Duplicate identifier 'artists'
    // @Column("varchar", { array: true })
    // artists: string[]

    @Column("date")
    releasedDate: Date

    @Column("time")
    duration: Date

    @Column("text")
    lyrics: string

    @ManyToMany(() => Artist, (artists) => artists.songs, { cascade: true })
    @JoinTable({ name: "songs_artists" })
    artists: Artist[];

    // many songs can belong to playlist for each unique user 
    @ManyToOne(() => Playlist, (playList) => playList.songs)
    playList: Playlist;
}
