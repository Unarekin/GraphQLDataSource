import { TestBed } from '@angular/core/testing';
import { GraphQLDataSource, GraphQLDataSourceSettings } from './';
import { ApolloServer, gql } from 'apollo-server';
import { expect, assert, should } from 'chai';
const fetch = require('node-fetch');

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
  let server: ApolloServer = null;
  let settings: GraphQLDataSourceSettings<any> = {
    server: "",
    query: typeDefs,
    params: {},
    dataFilter: (document: any) => { return []; },
    countFilter: (document: any) => { return 0; }
  };

  before("Creates server", async () => {
    server = new ApolloServer({
      typeDefs,
      mocks: true
    });
    // return server.listen().then(({ url }) => { settings.server = url; });
    let res = await server.listen();
    settings.server = res.url;
  });

  after("Shuts down server", async () => { await server.stop(); });

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it("Creates", () => {
    let source = new GraphQLDataSource<any>(settings);
    assert.isObject(source, "GraphQLDataSource does not appear to have been instantiated.");
  });

  it("Can fetch from GraphQL mock", async () => {
    let query: string = `{
      allHorses
        {
          id
          name
          netWorth
          description
        }
    }`;
    // console.log(query);
    let res = await fetch(settings.server, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });
    // let body = await res.text();
    let body = await res.json();
    assert.notEqual(res.status, 500, body);
    assert.ok(body);
    assert.property(body, "data", "Expected response to have 'data' property.");
    assert.isObject(body.data, "Expected data to be an object.");
    assert.property(body.data, "allHorses", "Expected data to have allHorses property.");
    assert.isArray(body.data.allHorses, "Expected allHorses result to be array.");
    assert.isAbove(body.data.allHorses.length, 0, "Expected query to return more than 0 results.");
    let item = body.data.allHorses[0];
    assert.property(item, "id");
    assert.property(item, "name");
    assert.property(item, "netWorth");
    assert.property(item, "description");
  });

});