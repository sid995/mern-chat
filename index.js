const { graphql, buildSchema } = require("graphql");

const db = {
  users: [
    { id: "1", name: "Alex", email: "alex@gmail.com" },
    { id: "2", name: "John", email: "john@gmail.com" }
  ]
};

// schema creation
const schema = buildSchema(`
  type Query{
    users: [User!]!
  }

  type User{
    id: ID!
    email: String!
    name: String
    avatarUrl: String
  }
`);

const rootValue = {
  // resolver functions
  users: () => db.users
};

graphql(
  schema,
  `
    {
      users {
        id
        name
        email
      }
    }
  `,
  rootValue
)
  .then(res => console.dir(res, { depth: null }))
  .catch(console.log);
