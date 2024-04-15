select * from questions

update questions
set name = 'What do you need to think of in order to conjure a Patronus Charm?'
where public_id = 'f2d561ef-2b3c-4c40-8130-ebb1697cf77e'

DELETE FROM questions
WHERE public_id = 'f2d561ef-2b3c-4c40-8130-ebb1697cf77e'

UPDATE questions
SET name = ${name}, read_duration = ${read_duration}, answer_duration = ${answer_duration}
WHERE public_id = ${questionId}