type Props = {
    params: {
        interviewId: string,
    }
}

const Interview : React.FC <Props> = ( {params : {interviewId} } ) => {
  return (
    <p>{`Interview ${interviewId}`}</p>
  )
}

export default Interview