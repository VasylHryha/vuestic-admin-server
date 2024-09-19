create table public.users (
  _id bigint primary key generated always as identity,
  id uuid,
	fullname text,
	email text,
	username text,
	role text,
	projects text[],
	is_active boolean,
	avatar text
);
