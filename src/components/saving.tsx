import { FC } from 'react'
import { Spinner } from './spinner';

interface IProps {
  message: string
  saving: string
}

const warning = "Please don't close this window!"

export const Saving: FC<IProps> = ({message, saving}) => {
  return (
    <div className='flex flex-col items-center text-xl p-20'>
      <div className='p-3'>{message}</div>
      <div className='p-3'>{saving}</div>
      <div className='text-primary-dark p-3'>{warning}</div>
      <Spinner size={80} />
    </div>
  )
}
