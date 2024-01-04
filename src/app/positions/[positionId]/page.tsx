type Props = {
    params: {
        positionId: string,
    }
}

const Position : React.FC <Props> = ( { params : {positionId} } ) => {
  return (
    <p>{`Position ${positionId}`}</p>
  )
}

export default Position