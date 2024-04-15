import { getRecruiterInterviews } from '@/actions/interview'
import { InterviewCardRecruiter } from '@/app/interviews/interview-card-recruiter'

export const InterviewsRecruiter = async () => {
  const data = await getRecruiterInterviews()
  const interviews = data?.interviews ?? []
  return (
    <div>
      {interviews.map((interview) => (
        <InterviewCardRecruiter key={interview.public_id} interview={interview} />
      ))}
    </div>
  )
}
