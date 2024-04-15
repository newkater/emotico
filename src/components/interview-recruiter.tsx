import { FC } from 'react'
import { Title } from './title';

interface IProps {
  interviewId: string;
}

export const InterviewRecruiter : FC<IProps> = async ({ interviewId }) => {
  return (
    <div>
      <Title>InterviewsRecruiter</Title>
      <div>{interviewId}</div>
    </div>
  )
}
