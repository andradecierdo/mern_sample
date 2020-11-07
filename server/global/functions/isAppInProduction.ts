const isAppInProduction = (): boolean => {
  return process.env.ENV === 'prod'
}

export default isAppInProduction
