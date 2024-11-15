drop table if exists public.users;
drop type if exists roles;

create type roles as enum ('owner', 'admin', 'user');
create type project_status
as enum ('important', 'completed', 'archived', 'in progress');

create table public.users (
  id uuid primary key default gen_random_uuid(),
  email varchar(64) unique not null,
  fullname varchar(255) not null,
  username varchar(255) unique not null,
  role roles default 'user',
  projects uuid [] default '{}',
  active boolean default true,
  avatar text,
  notes text,
  created_at timestamp not null default now(),
  updated_at timestamp
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  project_name varchar(255) not null,
  project_owner uuid,
  team uuid [] default '{}',
  status project_status default 'in progress',
  created_at timestamp not null default now(),
  updated_at timestamp,
  constraint fk_user
  foreign key (project_owner)
  references public.users (id)
  on delete set null
);

create or replace function update_date()
returns trigger as $update_date$
begin
    if (new <> old) then
      new.updated_at = now();
    end if;
    return new;
end;
$update_date$ language plpgsql;

create trigger update_date
before update
on public.projects
for each row
execute function update_date();

create trigger update_date
before update
on public.users
for each row
execute function update_date();

alter table public.projects
enable trigger update_date;

alter table public.users
enable trigger update_date;
