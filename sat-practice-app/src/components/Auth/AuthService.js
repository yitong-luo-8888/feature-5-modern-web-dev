// src/Components/Auth/AuthService.js
import Parse from "parse";

// Register a new user
export const createUser = async (newUser) => {
  const user = new Parse.User();

  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  try {
    const registeredUser = await user.signUp();
    return registeredUser;
  } catch (error) {
    alert(`Registration Error: ${error.message}`);
    throw error;
  }
};

// Log in a user
export const loginUser = async (currUser) => {
  try {
    const loggedInUser = await Parse.User.logIn(currUser.email, currUser.password);
    return loggedInUser;
  } catch (error) {
    alert(`Login Error: ${error.message}`);
    throw error;
  }
};

// Check if user is authenticated
export const checkUser = () => {
  const user = Parse.User.current();
  return user !== null && user.authenticated();
};

// Log out
export const logoutUser = async () => {
  try {
    await Parse.User.logOut();
  } catch (error) {
    alert(`Logout Error: ${error.message}`);
    throw error;
  }
};
