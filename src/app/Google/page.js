'use client'

import React, { useState } from 'react';
import { Client, Account } from 'appwrite';

const AppwriteGoogleAuth = () => {
  const handleGoogleAuth = async () => {
    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite API Endpoint
      .setProject('652dff363151cea1ad75'); // Your Appwrite Project ID

    const account = new Account(client);

    try {
      const successUrl = `http://localhost:3000/Storage`; // Replace '/success' with your success route
      const failureUrl = `${window.location.origin}/failure`; // Replace '/failure' with your failure route

      const authUrl = await account.createOAuth2Session('google', successUrl, failureUrl);

      // Open a new window for Google authentication
      window.open(authUrl, '_blank', 'width=500,height=600'); // Adjust width and height as needed
    } catch (error) {
      console.error('Error during Google authentication:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Google Authentication with Appwrite</h2>
      <button onClick={handleGoogleAuth}>Authenticate with Google</button>
    </div>
  );
};

export default AppwriteGoogleAuth;
