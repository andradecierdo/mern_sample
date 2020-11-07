import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date'

const resolvers = {
    Date: GraphQLDate,
    DateTime: GraphQLDateTime,
}

export default resolvers
