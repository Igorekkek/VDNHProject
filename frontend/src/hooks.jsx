import { useQuery } from 'react-query'

export const usePoints = () => {
  return useQuery('allPointsData', () =>
    fetch('http://localhost:8000/api/getPOI/').then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`)
        return res.json()
      }
    )
  )
}
