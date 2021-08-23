export default {
  getDaysDifference(start, end) {
    return Math.floor((end - start) / 86400000)
  },
  isInTimeSpan(time, start, stop) {
    if (time == null || start == null || stop == null) return false
    return time >= start - 36000000 && time < stop
  },
  getDayString(quantity) {
    return quantity + (quantity == 1 ? ' day' : ' days')
  },
  simpleDateParams: [undefined, { month: 'short', day: 'numeric' }]
}
