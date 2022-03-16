import gql from "graphql-tag";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      calendarList {
        name
        _id
        months
        days
        currentYear
        daysInYear
        monthDayCount
        dayIndex
        monthIndex
      }
    }
  }
`;
