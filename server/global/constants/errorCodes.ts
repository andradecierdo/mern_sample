const errorCodes = {
  /* -------------------------------------------------------------------------------- */
  /* Apollo Graphql */
  /* -------------------------------------------------------------------------------- */
  /* Invalid auth token */
  6001: 'Invalid authorization',

  /* User is not an admin */
  6002: 'Not Authenticated',

  /* Apollo server query fails */
  6003: 'Something went wrong while fetching your data',

  /* Apollo server mutation fails */
  6004: 'Something went wrong while saving your data',

  /* Apollo server mutation on soft-deleting data fails */
  6005: 'Something went wrong while deleting your data',
}

export default errorCodes
