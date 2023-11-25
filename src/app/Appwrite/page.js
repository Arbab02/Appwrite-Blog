'use client'


import React, { useState, useEffect } from 'react';
import { Client, Account, ID } from 'appwrite';

const AppwriteLoginPage = ({ setLoggedInUser }) => {
  const [loggedInUser, setLoggedInUserState] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('652dff363151cea1ad75');
  const account = new Account(client);

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    try {
      const userDetails = await account.get();
      setLoggedInUserState(userDetails);
      setLoggedInUser(userDetails); // Pass user details to parent component
    } catch (error) {
      setLoggedInUserState(null);
      setLoggedInUser(null); // If not logged in, pass null to parent component
    }
  };

  const login = async (email, password) => {
    try {
      const session = await account.createEmailSession(email, password);
      checkLoggedIn();
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure
    }
  };

  const register = async () => {
    try {
      await account.create(ID.unique(), email, password, name);
      login(email, password);
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration failure
    }
  };

  const verify = async () => {
    try {
      await account.updateEmailVerification(true);
    } catch (error) {
      console.error('Verification failed:', error);
      // Handle verification failure
    }
  };

  const googleAuth = async () => {
    try {
      const successUrl = `http://localhost:3000/Storage`; // Replace '/success' with your success route
      const failureUrl = `${window.location.origin}/failure`; // Replace '/failure' with your failure route

      const authUrl = await account.createOAuth2Session('google', successUrl, failureUrl);

      window.open(authUrl, '_blank', 'width=500,height=600'); // Open a new window for Google authentication
    } catch (error) {
      console.error('Google authentication failed:', error);
      // Handle Google authentication failure
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setLoggedInUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout failure
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      {loggedInUser ? (
        <div>
          <p>{`Logged in as ${loggedInUser.name}`}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <p>Not logged in</p>
          <form className="flex flex-col items-center">
            {/* Input fields for email, password, name */}
            <div className="mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                type="button"
                onClick={() => login(email, password)}
              >
                Login
              </button>
              {/* Other buttons for registration, verification, Google auth */}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AppwriteLoginPage;
