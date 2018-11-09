const { ApolloServer, gql } = require("apollo-server");
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
    { id: "3", userId: "1", body: "Bye", createdAt: Date.now() }
  ]
};

// schema creation
const typeDefs = gql`
  type Query {
    users: [User!]!
    user(id: ID!): User
    messages: [Message!]!
  }

  type Mutation {
    addUser(email: String!, name: String): User
  }

  type User {
    id: ID!
    email: String!
    name: String
    avatarUrl: String
    messages: [Message!]!
  }

  type Message {
    id: ID!
    body: String!
    createdAt: String
  }
`;

const resolvers = {
  Query: {
    users: () => db.users,
    user: (root, { id }) => db.users.find(user => user.id === id),
    messages: () => db.messages
  },
  Mutation: {
    addUser: (root, { name, email }) => {
      const user = {
        id: crypto.randomBytes(10).toString("hex"),
        email,
        name
      };
      db.users.push(user);
      return user;
    }
  },
  User: {
    messages: user => db.messages.filter(message => message.userId === user.id)
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(url));
