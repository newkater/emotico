select * from recruiters r
join users u
on u.public_id = r.public_id

select * from users

delete from recruiters
where id=7

delete from users
where id=13

update recruiters
set company_public_id = '1c4167c1-d946-48ad-b070-1b99a3b1eb82'
where id=6

UPDATE users
SET photo = ''
WHERE public_id = 'id'
