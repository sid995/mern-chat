const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const crypto = require("crypto");

const db = {
  users: [
    {
      id: "1",
      name: "Alex",
      email: "alex@gmail.com",
      avatarUrl: "https://gravatar.com/..."
    },
    {
      id: "2",
      name: "John",
      email: "john@gmail.com",
      avatarUrl: "https://gravatar.com/..."
    }
  ],
  messages: [
    { id: "1", userId: "1", body: "hello", createdAt: Date.now() },
    { id: "2", userId: "2", body: "Hi", createdAt: Date.now() },
    { id: "3", userId: "3", body: "Bye", createdAt: Date.now() }
  ]
};

class User {
  constructor(user) {
    Object.assign(this, user);
  }
  get messages() {
    return db.messages.filter(message => message.userId === this.id);
  }
}

// schema creation
const schema = buildSchema(`
  type Query{
    users: [User!]!
    user(id: ID!): User
    messages: [Message!]!
  }

  type Mutation{
    addUser(email: String!, name: String): User
  }

  type User{
    id: ID!
    email: String!
    name: String
    avatarUrl: String
    messages: [Message!]!
  }

  type Message{
    id: ID!
    body: String!
    createdAt: String
  }
`);

const rootValue = {
  // resolver functions
  users: () => db.users.map(user => new User(user)),
  user: args => db.users.find(user => user.id === args.id),
  messages: () => db.messages,
  addUser: ({ name, email }) => {
    const user = {
      id: crypto.randomBytes(10).toString("hex"),
      email,
      name
    };
    db.users.push(user);
    return user;
  }
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
  })
);

app.listen(3000, () => console.log("Listening on 3000"));
