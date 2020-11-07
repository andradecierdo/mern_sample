const validateString = (value: string): boolean => {
  if (typeof value === 'string') {
    return true
  }
  return false
}

export default validateString
