create TYPE roles as ENUM ('OWNER', 'ADMIN', 'USER');

alter table public.users
add column notes text;

alter table public.users
drop column role;

alter table public.users
add column role roles;

create or replace function get_types (enum_type text)
returns json as $$
declare
  json_data json;
  text_query text;
begin
  text_query := format (
    'SELECT array_to_json(enum_range(NULL::%s))',
    enum_type
  );

  execute text_query into json_data;

  return json_data;
end
$$ language 'plpgsql';
