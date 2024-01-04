type Props = {
    params: {
        applicationId: string,
    }
}

const Application : React.FC <Props> = ( {params : {applicationId} } ) => {
  return (
    <div>{`Application ${applicationId}`}</div>
  )
}

export default Application