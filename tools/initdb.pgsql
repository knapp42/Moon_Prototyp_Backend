-- auto-generated definition
create table if not exists notice
(
    id            serial not null
        constraint notice_pk
            primary key
        constraint user_id_fk
            references "user"
            on update cascade on delete cascade,
    content       text,
    last_modified date
);

alter table notice
    owner to moon;

create unique index notice_content_index
    on notice (content);

-- auto-generated definition
create table if not exists "user"
(
    id   serial       not null
        constraint user_pk
            primary key,
    name varchar(100) not null
);

alter table "user"
    owner to moon;
