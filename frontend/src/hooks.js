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
      ).catch(console.error)
    , {
      refetchOnWindowFocus: false, refetchOnReconnect: false, staleTime: 360_000
    })
}

export const useHistory = () => {
  let userCode = localStorage.getItem('userMapApiCode')

  const { data: newUser } = useQuery('createUser', () => {
    return fetch('http://localhost:8000/api/createUser').then(res => {
      if (!res.ok) throw new Error(`Error ${res.status}`)
      return res.json()
    }).catch(console.error)
  }, { enabled: !userCode })

  if (newUser) {
    userCode = newUser['user_code']
    localStorage.setItem('userMapApiCode', userCode)
  }

  return useQuery('historyData', () => {
    const formData = new FormData()
    formData.set('user_code', userCode)

    return fetch('http://localhost:8000/api/getHistory/', {
      method: 'POST',
      body: formData,
    }).then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`)
        return res.json()
      }
    ).catch(console.error)
  }, { staleTime: 360_000 })
}
