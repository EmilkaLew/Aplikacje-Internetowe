create table if not exists music
(
    id      integer not null
        constraint music_pk
            primary key autoincrement,
    title text not null,
    artist text not null,
    album text not null
);
