create database hadru;
use hadru;

create table users (
		id int auto_increment not null,
		email varchar(255) not null,
        password varchar(255) not null,
		primary key(id)
);

insert into users
(email, password)
values
('ksagar.sk23@gmail.com', 'Sagar@1234');

select * from users;
