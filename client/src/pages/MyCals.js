import { useQuery, useMutation } from "@apollo/react-hooks";

import { GET_ME } from "../utils/queries";
import { REMOVE_CALENDAR } from "../utils/mutations";

import "../styles/Profile.css";

const MyCals = () => {
  const { data } = useQuery(GET_ME);
  const [removeCalendar] = useMutation(REMOVE_CALENDAR);

  const userData = data?.me || {};
  console.log(userData);

  const deleteCalendar = async (event) => {
    event.preventDefault();
    console.log(event.target);
    var areSure = window.confirm(
      `Are you Sure you Want to Delete Calendar ${event.target.name}?`
    );
    if (areSure === true) {
      try {
        const calendarId = event.target.value;
        const { data } = await removeCalendar({
          variables: { calendarId },
        });
        console.log(data);
        alert("Your Calendar has Been Deleted");
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
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
            <h3 id={c}>Calendar: {calendar.name}</h3>
            <button
              className="deleteCalBt"
              onClick={deleteCalendar}
              value={calendar._id}
              name={calendar.name}
            >
              Delete
            </button>
          </>
        );
      })}
    </div>
  );
};

export default MyCals;
