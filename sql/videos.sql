SELECT * from videos



INSERT INTO videos (public_id, interviews_public_id, path)
SELECT public_id, interviews_public_id, ''


DELETE FROM videos
WHERE id > 5
