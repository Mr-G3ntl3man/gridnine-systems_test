export const getFormatTime = (value: string) => {
   const [date, time] = value.split('T')
   const [year, month, day] = date.split('-')
   const [hour, minute] = time.split(':')

   const [formatMonth, formatDay] = new Date(+year, +month - 1, +day)
      .toLocaleDateString('ru', {weekday: 'long', month: 'long'})
      .split(' ')

   return {
      formatTime: `${hour}:${minute}`,
      formatDate: `${day} ${formatMonth.slice(0, 3)}. ${formatDay.slice(0, 2)}.`
   }
}