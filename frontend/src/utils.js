export const getClosestRoute = (start, points) => {
  const route = [start]
  points = new Set(points)

  while (points.size) {
    const prevPoint = route[route.length - 1]
    let newPoint = { longitude: Infinity, latitude: Infinity }
    for (const point of points) {
      if (Math.hypot(prevPoint.longitude - point.longitude, prevPoint.latitude - point.latitude) < Math.hypot(prevPoint.longitude - newPoint.longitude, prevPoint.latitude - newPoint.latitude))
        newPoint = point
    }
    route.push(newPoint)
    points.delete(newPoint)
  }
  return route
}
