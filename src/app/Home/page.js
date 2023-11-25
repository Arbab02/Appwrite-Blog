'use client'

import Navbar from '../Navbar/page'
import Crud from '../Crud/page'
import Storage from '../Storage/page'
import React, { useState, useEffect, useRef } from 'react';
import { Client, Account, ID, account } from 'appwrite';

const Home = (props) => {

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [show, setShow] = useState(false)
const formRef = useRef()
    // const toggleCalculator = () => {
    //   setShow(!show);
    // };

  
    const client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite API Endpoint
      .setProject('652dff363151cea1ad75'); // Your Appwrite Project ID
    const account = new Account(client);
  
    useEffect(() => {
      checkLoggedIn();
    }, []);
  
    const checkLoggedIn = async () => {
      try {
        const userDetails = await account.get();
        setLoggedInUser(userDetails);
      } catch (error) {
        setLoggedInUser(null);
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
        
        setShow(!show);
        formRef.current.style.display = 'none'
      } catch (error) {
        console.error('Registration failed:', error);
  
        // Handle registration failure
      }
    };
  
  //   const verify = async () => {
  //     try {
  //       await account.updateEmailVerification(true);
  //     } catch (error) {
  //       console.error('Verification failed:', error);
  //       // Handle verification failure
  //     }
  //   };
  
    const googleAuth = async () => {
      try {
        const successUrl = `http://localhost:3000/Home`; // Replace '/success' with your success route
        const failureUrl = `${window.location.origin}/failure`; // Replace '/failure' with your failure route
        
        const authUrl = await account.createOAuth2Session('google', successUrl, failureUrl);
        
        // Open a new window for Google authentication
        
        window.open(authUrl, '_blank', 'width=500,height=600') // Adjust width and height as needed
       
        setShow(!show);
        formRef.current.style.display = 'none'
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
  
    // if (loggedInUser) {
    //   return (
    //     <div className="flex flex-col items-center mt-8">
    //       <p>Logged in as {loggedInUser.name}</p>
    //       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={logout}>
    //         Logout
    //       </button>
    //     </div>
    //   );
    // }



  return (

    
    <>
   
    {show && <Navbar title={name}/>}
    {show && <Crud/>}
    {show && <Storage/>}
    <div className="flex flex-col items-center mt-8" ref={formRef}>
      <p>Not logged in</p>
      <form className="flex flex-col items-center">
        <input
          className="border border-gray-400 rounded px-2 py-1 mt-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border border-gray-400 rounded px-2 py-1 mt-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="border border-gray-400 rounded px-2 py-1 mt-2"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="mt-4">
          <button className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" type="button" onClick={() => login(email, password)}>
            Login
          </button>
          <button className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" type="button" onClick={register}>
            Register
          </button>
          {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" type="button" onClick={verify}>
            Verify
          </button> */}
          <center className='mt-4'>
          <div>Or</div>
          </center>
          <div className='mt-4'>
          <button className="bg-orange-900 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={googleAuth}>
            Log In With Google
          </button>
          </div>
        </div>
      </form>
    </div>
    {/* <Navbar title='hi'/>
    <Crud />
  <Storage/> */}
    </>
    
  )
}

export default Home;