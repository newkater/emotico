import { getCandidate } from '@/actions/candidate'
import { getFullName } from '@/lib/utils'
import React, { FC } from 'react'

interface IProps {
  candidateId: string
}

export const PositionDetailApplicant: FC<IProps> = async ({candidateId}) => {
  const candidate = await getCandidate(candidateId)

  const name = candidate ? getFullName(candidate) : "Interview"

  return (
    <span className="text-lg">{name}</span>
  )
}