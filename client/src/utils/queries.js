import gql from "graphql-tag";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      calendarList {
        name
        months
        days
        currentYear
        daysInYear
      }
    }
  }
`;
