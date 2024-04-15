import React from 'react'

interface IProps {
    children : React.ReactNode
}

export const Card: React.FC<IProps> = ({children}) => {
  return (
    <div className='flex flex-col items-center'>
      {children}
    </div>
  )
}
