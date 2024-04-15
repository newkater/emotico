CREATE ROLE authenticator LOGIN NOINHERIT NOCREATEDB NOCREATEROLE NOSUPERUSER;
CREATE ROLE anonymous NOLOGIN;
CREATE ROLE candidate NOLOGIN;
CREATE ROLE recruiter NOLOGIN;

GRANT anonymous TO authenticator;
GRANT anonymous TO postgres;
GRANT candidate TO authenticator;
GRANT candidate TO postgres;
GRANT recruiter TO authenticator;

SELECT current_schema();

SELECT * FROM pg_catalog.pg_tables;

grant usage on schema public to anonymous;
grant select on public.companies to anonymous;
grant select on public.interviews to anonymous;
grant select on public.user_interviews to anonymous;

grant usage on schema public to candidate;

select *
from information_schema.table_privileges
WHERE table_name = 'interviews';

