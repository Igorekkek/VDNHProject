import { useQuery } from 'react-query'

export const usePoints = () => {
  return useQuery('allPointsData', () =>
    fetch('http://localhost:8000/api/getPOI/').then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`)
        return res.json().then(points => points.map(p => ({
          ...p,
          title: p.title.slice(2, p.title.length - 1),
          category: p.category.slice(1, p.category.length - 1)
        })))
      }
    )
  )
}
