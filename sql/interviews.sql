select * from interviews

select * from user_interviews ui
JOIN candidates c ON c.id = ui.candidate_id

select * from interviews


update interviews 
set results = '{"score": 17, "video": "https://example.com/interview_video", "questions": [{"score": 8, "question": "What is your experience with object-oriented programming?", "evaluation": "Good", "video_link": "https://example.com/video1", "emotion_results": [{"emotion": "Happiness", "duration": 10.2, "exact_time": 24.5}, {"emotion": "Neutral", "duration": 5.7, "exact_time": 36.2}]}, {"score": 9, "question": "Describe a challenging project you have worked on.", "evaluation": "Excellent performance with exceptional problem-solving skills", "video_link": "https://example.com/video2", "emotion_results": [{"emotion": "Confidence", "duration": 8.5, "exact_time": 45.8}, {"emotion": "Determination", "duration": 7.1, "exact_time": 56.3}]}]}'
where id > 5

SELECT * from videos

delete from interviews
where id > 6