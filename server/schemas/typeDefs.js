const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Calendar {
    _id: ID
    name: String
    days: [String]
    months: [String]
    currentYear: Int
    daysInYear: Int
    monthDayCount: [Int]
    dayIndex: Int
    monthIndex: Int
  }

  type User {
    _id: ID
    username: String
    email: String
    calendarList: [Calendar]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    me: User
  }

  input CalendarInput {
    name: String
    days: [String]
    months: [String]
    monthDayCount: [Int]
    currentYear: Int
    daysInYear: Int
    dayIndex: Int
    monthIndex: Int
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    removeUser(userId: String!): User
    addCalendar(calendar: CalendarInput): User
    removeCalendar(calendarId: String!): User
  }
`;

module.exports = typeDefs;
