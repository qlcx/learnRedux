import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';

export function signinUser( { email, password }) {
  return dispatch => {
    // Submit email/password to the server
    // { email, password } => { email: email, password: password }
    axios.post(`${ROOT_URL}/signin`, { email, password });

    // If request is good..
    // - Update state to indicate user is authenticated
    // - Save the JWT token
    // - redirect to the route '/feature'

    // If request is bad...
    // - Show an error to the user
  }
}