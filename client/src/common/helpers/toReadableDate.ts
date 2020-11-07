const toReadableDate = (dateString: string | Date): string => {
  if (dateString === '' || dateString === null) {
    return 'N/A'
  }

  const formattedDate = new Date(dateString).toLocaleString('en-US', {
    timeZone: 'America/New_York',
  })

  return formattedDate
}

export default toReadableDate
