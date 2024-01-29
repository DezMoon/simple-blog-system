type Post {
  id: ID!
  title: String!
  content: String!
  author: User
  comments: [Comment!]!
}

type User {
  id: ID!
  username: String!
  email: String!
}

type Comment {
  id: ID!
  content: String!
  author: User
}

type Query {
  posts: [Post!]!
  post(id: ID!): Post
}

type Mutation {
  createPost(title: String!, content: String!): Post!
}
