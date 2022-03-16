import { useQuery, useMutation } from "@apollo/react-hooks";

import { GET_ME } from "../utils/queries";
import { REMOVE_CALENDAR } from "../utils/mutations";

import "../styles/Profile.css";

const MyCals = () => {
  const { data } = useQuery(GET_ME);
  const [removeCalendar, { error }] = useMutation(REMOVE_CALENDAR);

  const userData = data?.me || {};
  console.log(userData);

  const deleteCalendar = (event) => {
    event.preventDefault();
    console.log("remove calendar");
  };

  if (!userData?.username) {
    return (
      <div id="myCalsPage">
        <h1 id="welcome">You must be logged in to view the mycals page</h1>
      </div>
    );
  }

  return (
    <div id="mainContainer">
      <h1>MyCals</h1>
      <h1>Welcome Back {userData.username}!</h1>
      {userData.calendarList.map((calendar, c) => {
        return (
          <>
            <h3>Calendar: {calendar.name}</h3>
            <button id="deleteCalBt" onClick={deleteCalendar}>
              Delete
            </button>
          </>
        );
      })}
    </div>
  );
};

export default MyCals;
