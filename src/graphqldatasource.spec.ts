import { TestBed } from '@angular/core/testing';
import { GraphQLDataSource, GraphQLDataSourceSettings } from './graphqldatasource';
import { ApolloServer, gql } from 'apollo-server';
import { expect, assert, should } from 'chai';

const typeDefs = gql`
type Cat {
  id: ID!
  name: String!
  age: Int!
  nice: Boolean
}
type Horse {
  id: ID!
  name: String!
  netWorth: Float!
  description: String
}
type Query {
  allCats: [Cat!]!
  allHorses: [Horse!]!
}
`;

describe('GraphQLDataSource', () => {
  let source: GraphQLDataSource<any> = null;
  let server: ApolloServer = null;
  let serverUrl: string = "";

  before("Creates server", () => {
    server = new ApolloServer({
      typeDefs,
      mocks: true
    });
    return server.listen().then(({ url }) => { serverUrl = url; });
  });

  after("Shuts down server", async () => {
    await server.stop();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it("Creates", () => {
    let settings: GraphQLDataSourceSettings<any> = {
      server: serverUrl,
      query: typeDefs,
      params: {},
      dataFilter: (document: any) => { return []; },
      countFilter: (document: any) => { return 0; }
    };

    source = new GraphQLDataSource<any>(settings);
    assert.isObject(source, "GraphQLDataSource does not appear to have been instantiated.");
  });

})