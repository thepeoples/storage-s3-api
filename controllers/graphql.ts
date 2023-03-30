// TODO: this file should be moved into its own `storage-gql-api` service

import {Context, Request} from "$oak/mod.ts";
import {GraphQLHTTP} from "$gql/mod.ts";
import {gql} from "$gqlTag/mod.ts"
import { makeExecutableSchema } from "$gqlTools/mod.ts";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
    Query: {
        hello: () => `Hello, World!`,
    },
};

const schema = makeExecutableSchema({ resolvers, typeDefs});

export async function getGraphQL(ctx: Context) {
    await GraphQLHTTP<Request>({
        schema,
        graphiql: true,
    })(ctx.request);
}
