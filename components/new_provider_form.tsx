"use client";

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';


const NewProvider = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch('/api/createProvider', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    });

    const data = await response.json();
    
    if (response.status !== 200) {
      console.log('FORM] Error occurred:', data.error);
      alert(JSON.stringify(data.error));
    } else {
      console.log('FORM] Form submitted successfully. Redirecting...');
      // router.push('/newProvider');
    }
  };
  

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-center text-white">
          Get on the list!
        </h1>

        <form className="mt-2 flex flex-col p-6" onSubmit={handleSubmit}>
          <label htmlFor="name" className="text-gray-200">
            Name
          </label>
          <input
            className="py-2 px-4 rounded-md focus:outline-none focus:ring-2 text-black"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="description" className="mt-6 text-gray-200">
            Description
          </label>
          <input
            className="py-2 px-4 rounded-md focus:outline-none focus:ring-2 text-black"
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            className="mt-10 text-lg text-white font-semibold bg-green-500 py-3 px-6 rounded-md focus:outline-none focus:ring-2"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProvider;