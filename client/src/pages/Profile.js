import { useQuery, useMutation } from "@apollo/react-hooks";

import { GET_ME } from "../utils/queries";
import { REMOVE_USER } from "../utils/mutations";

import Auth from "../utils/auth";

import "../styles/Profile.css";

const Profile = () => {
  const { data } = useQuery(GET_ME);

  const [removeUser] = useMutation(REMOVE_USER);
  return (
    <div id="mainContainer">
      <h1>Profile</h1>
    </div>
  );
};

export default Profile;
