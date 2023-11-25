'use client'

import Image from 'next/image'
import Link from 'next/link'
import {useState, useEffect, useContext} from 'react'
import { Client, Databases, ID, Query} from 'appwrite';



const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('652dff363151cea1ad75');


    export default function Home(props) {
      
        const [blogPosts, setblogPosts] = useState([]);
        const [title, setTitle] = useState('');
        const [content, setContent] = useState('');
       
        const databases = new Databases(client);
   
  const create = () =>{
  
  
  const promise = databases.createDocument(
    '652e031e0be050f9d7ef',
    '652e03255109b691c33b',
    ID.unique(),
    {
      "title": title,
      "content": content, 
      "slug": "hamlet" // Include any other required attributes recognized by your database
    }
  );
  
  promise.then(
    function (response) {
      console.log(response);
     setblogPosts(response)
    },
    function (error) {
      console.log(error);
    }
  );
  
    };
    
   
  
  
      const read = () => {
      
      
        let promise = databases.listDocuments(
          "652e031e0be050f9d7ef",
          "652e03255109b691c33b",
          [
            Query.equal("title",title),
          
          ]
        );
      
        promise.then(function (response) {
          console.log(response.documents[0]);
          alert('Document Found!')
        }, function (error) {
          alert('Document Not Found!')
          console.log(error);
        });
      };
      
  
     
      const update = () => {
        
        const updateDocumentByTitle = (title, newTitle, newContent) => {
          // Step 1: Find the document by title
          databases
            .listDocuments("652e031e0be050f9d7ef", "652e03255109b691c33b", [
              Query.equal("title", title),
            ])
            .then(function (response) {
              if (response.documents.length > 0) {
                const documentId = response.documents[0].$id;
        
                // Step 2: Update the document
                const documentData = {
                  title: newTitle, // New title
                  content: newContent, // New content
                };
        
                databases
                  .updateDocument("652e031e0be050f9d7ef", "652e03255109b691c33b", documentId, documentData)
                  .then(function (updateResponse) {
                    console.log("Document updated successfully:", updateResponse);
                    alert('Document Updated Successfully!')
                  })
                  .catch(function (updateError) {
                    console.error("Error updating document:", updateError);
                  });
              } else {
                console.error("Document not found with title:", title);
                alert('Document not found with this title!')
              }
            })
            .catch(function (error) {
              console.error("Error searching for the document:", error);
            });
        };
        
        // Usage
        updateDocumentByTitle(title, title, content);
        
      }
  
      const deleting = () => {
        
        const deleteDocumentByTitle = (title, newTitle, newContent) => {
          // Step 1: Find the document by title
          databases
            .listDocuments("652e031e0be050f9d7ef", "652e03255109b691c33b", [
              Query.equal("title", title),
            ])
            .then(function (response) {
              if (response.documents.length > 0) {
                const documentId = response.documents[0].$id;
        
                // Step 2: Update the document
                const documentData = {
                  title: newTitle, // New title
                  content: newContent, // New content
                };
        
                databases
                  .deleteDocument("652e031e0be050f9d7ef", "652e03255109b691c33b", documentId, documentData)
                  .then(function (deleteResponse) {
                    console.log("Document updated successfully:", deleteResponse);
                    alert('Document Deleted Successfully!')
                  })
                  .catch(function (deleteError) {
                    console.error("Error updating document:", deleteError);
                  });
              } else {
                console.error("Document not found with title:", title);
                alert('Document Not found with this title!')
              }
            })
            .catch(function (error) {
              console.error("Error searching for the document:", error);
            });
        };
        
        // Usage
      deleteDocumentByTitle(title, title, content);
        
      }  
  
   
  
    return (
      <>
 
  <section class="text-black body-font">
    <form class=" max-w-lg mx-auto p-4 bg-gray-800 rounded shadow-md">
      <div class="mb-4">
        <label for="title" class="block text-gray-400">Title </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          class="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div class="mb-4">
        <label for="content" class="block text-gray-400">Content</label>
        <input
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          class="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div class="flex justify-between">
        <button
          type="button"
          class="flex-1 bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 mr-2"
          onClick={create}
        >
          Create
        </button>
  
        <button
          type="button"
          class="flex-1 bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 mr-2"
          onClick={read}
        >
          Read
        </button>
  
        <button
          type="button"
          class="flex-1 bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 mr-2"
          onClick={update}
        >
          Update
        </button>
        
        <button
          type="button"
          class="flex-1 bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={deleting}
        >
          Delete
        </button>
      </div>
    </form>
  </section>
  
  <section className="text-gray-400 bg-gray-900 body-font">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-wrap -m-4">
        <div className="p-4 lg:w-1/3">
          <div className="h-full bg-gray-800 bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
           
            <h1 className="title-font sm:text-2xl text-xl font-medium text-white mb-3">{blogPosts.title}</h1>
            <p className="leading-relaxed mb-3">{blogPosts.content}</p>
            <a className="text-indigo-400 inline-flex items-center docs-creator">Learn More
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
            <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
              <span className="text-gray-500 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-700 border-opacity-50">
                <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>1.2K
              </span>
              <span className="text-gray-500 inline-flex items-center leading-none text-sm">
                <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>6
              </span>
            </div>
          </div>
        </div>
        <div className="p-4 lg:w-1/3">
          <div className="h-full bg-gray-800 bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
          
            <h1 className="title-font sm:text-2xl text-xl font-medium text-white mb-3">{blogPosts.title}</h1>
            <p className="leading-relaxed mb-3">{blogPosts.content}</p>
            <a className="text-indigo-400 inline-flex items-center docs-creator">Learn More
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
            <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
              <span className="text-gray-500 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-700 border-opacity-50">
                <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>1.2K
              </span>
              <span className="text-gray-500 inline-flex items-center leading-none text-sm">
                <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>6
              </span>
            </div>
          </div>
        </div>
        <div className="p-4 lg:w-1/3">
          <div className="h-full bg-gray-800 bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
          
            <h1 className="title-font sm:text-2xl text-xl font-medium text-white mb-3">{blogPosts.title}</h1>
            <p className="leading-relaxed mb-3">{blogPosts.content}</p>
            <a className="text-indigo-400 inline-flex items-center docs-creator">Learn More
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
            <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
              <span className="text-gray-500 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-700 border-opacity-50">
                <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>1.2K
              </span>
              <span className="text-gray-500 inline-flex items-center leading-none text-sm">
                <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>6
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
      </>
    )
  }
