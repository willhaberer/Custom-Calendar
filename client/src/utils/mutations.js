import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($userId: String!) {
    removeUser(userId: $userId) {
      username
      email
    }
  }
`;

export const REMOVE_CALENDAR = gql`
  mutation removeCalendar($calendarId: String!) {
    removeCalendar(calendarId: $calendarId) {
      username
      email
      calendarList {
        name
        months
        days
        currentYear
        dayIndex
        monthIndex
      }
    }
  }
`;

export const ADD_CALENDAR = gql`
  mutation addCalendar($calendar: CalendarInput!) {
    addCalendar(calendar: $calendar) {
      username
      email
      calendarList {
        name
        months
        days
        currentYear
        dayIndex
        monthIndex
      }
    }
  }
`;
