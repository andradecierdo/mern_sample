const toReadableDate = (dateString: string | Date): string => {
  if (dateString === '' || dateString === null) {
    return 'N/A'
  }

  return new Date(dateString).toLocaleString('en-US', {
    timeZone: 'America/New_York',
  })
}

export default toReadableDate
