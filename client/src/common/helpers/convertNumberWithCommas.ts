const convertNumberWithCommas = (n: number): string => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default convertNumberWithCommas
