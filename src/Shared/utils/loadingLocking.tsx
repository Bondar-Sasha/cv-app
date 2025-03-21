import {CircleProgress} from '../ui'

export const loadingLocking = (isLoading: boolean) => {
  return (data: unknown) => {
    if (isLoading) {
      return <CircleProgress />
    }
    return data
  }
}
