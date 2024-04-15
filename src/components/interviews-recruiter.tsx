import { getRecruiterInterviews } from '@/actions/interview'
import { InterviewCard } from '@/app/interviews/interview-card'

export const InterviewsRecruiter = async () => {
  const data = await getRecruiterInterviews()
  const interviews = data?.interviews ?? []
  return (
    <div>
      {interviews.map((interview) => (
        <InterviewCard key={interview.public_id} interview={interview} />
      ))}
    </div>
  )
}
