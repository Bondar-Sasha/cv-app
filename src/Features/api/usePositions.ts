import {gql, useQuery} from '@apollo/client'
import {Department} from 'cv-graphql'

interface PositionsResponse {
  positions: Department[]
}

const ALL_POSITIONS = gql`
  query {
    positions {
      id
      name
    }
  }
`

export const usePositions = () => {
  const {data, loading, ...helpers} = useQuery<PositionsResponse>(
    ALL_POSITIONS,
    {}
  )
  return {
    ...helpers,
    positionsFetching: loading,
    positions: data?.positions
      ? [...data.positions, {id: '', name: 'No position'}]
      : undefined,
  }
}
