import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'

export const usePoints = () => {
  return useQuery('allPointsData', () =>
      fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/getPOI/`).then(res => {
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
    return fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/createUser`).then(res => {
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

    return fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/getHistory/`, {
      method: 'POST',
      body: formData,
    }).then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`)
        return res.json()
      }
    ).catch(console.error)
  }, { staleTime: 360_000 })
}

export const useStaticRoutes = () => {
  return useQuery('staticRoutes', () => {
    return fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/getReadyRoutes`).then(res => {
      if (!res.ok) throw new Error(`Error ${res.status}`)
      return res.json()
    }).catch(console.error)
  }, { staleTime: Infinity })
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState([window.innerWidth, window.innerHeight])
  useEffect(() => {
    const onResize = () => setWindowDimensions([window.innerWidth, window.innerHeight])
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return windowDimensions
}
