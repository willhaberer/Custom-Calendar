import { useQuery, useMutation } from "@apollo/react-hooks";

import { GET_ME } from "../utils/queries";
import { REMOVE_USER } from "../utils/mutations";

import Auth from "../utils/auth";

import "../styles/Profile.css";

const Profile = () => {
  const { data } = useQuery(GET_ME);
  const [removeUser] = useMutation(REMOVE_USER);

  const userData = data?.me || {};
  console.log(userData);

  const handleRemoveUser = async () => {
    console.log(userData._id);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      alert("Must be Signed in to Remove Songs!");
      return;
    }

    const userId = userData._id;

    var areSure = window.confirm(
      "Are you Sure you Want to Delete your Account?"
    );

    if (areSure === true) {
      try {
        const { data } = await removeUser({
          variables: { userId },
        });
        console.log(data);
        alert("We Are Sorry To See You Go");
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!userData?.username) {
    return (
      <div id="profilePage">
        <h1 id="welcome">You must be logged in to view the profile page</h1>
      </div>
    );
  }

  return (
    <div id="mainContainer">
      <h1>Profile</h1>
      <button id="removeUser" onClick={handleRemoveUser}>
        Delete Your Account
      </button>
    </div>
  );
};

export default Profile;
