export const formatFlightTime = (time: number) => {
   const [hour, minute] = String((time / 60).toFixed(2)).split('.')
   
   return `${hour} ч ${minute} мин`
}