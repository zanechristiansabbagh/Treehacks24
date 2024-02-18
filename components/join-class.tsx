"use client"
import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import React, { useState, useMemo, useEffect } from 'react';

export const JoinClass = ({parsedEmail}) => {
  // Initialize the input state with useState hook
  const [phoneValue, setPhoneValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // Added state to track submission status
  const pageURL = window.location.href
  const uncutEmail = pageURL.substring(pageURL.lastIndexOf('/') + 1);
  const email = uncutEmail.replace(/@URAD0G@/g, ".");
  const getClassesByEmail = useQuery(api.classes.getClassesByEmail , {email: email});

  const createNewStudent = useMutation(api.students.createNewStudent);
  const addStudentToClass = useMutation(api.classes.addStudentToClass);
  const createNewClassIfNotExists = useMutation(api.classes.createNewClassIfNotExists);
  console.log(email === "christenxie@gmail.com")
  console.log(getClassesByEmail, "classID")
  useEffect(() => {
    console.log("Email: ", email)
  }, []);
  
  const handleNameChange = (e) => {
    setNameValue(e.target.value)
  }

  // Optimized phone number formatting function
  const handlePhoneChange = (e) => {
    const formattedValue = e.target.value.replace(/[^\d]/g, '').replace(/(\d{1,3})(\d{0,3})(\d{0,4})/, (match, p1, p2, p3) => [p1, p2, p3].filter(Boolean).join('-'));
    setPhoneValue(formattedValue);
  };

  // Example function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsSubmitted(!isSubmitted); // Toggle the isSubmitted state on form submission
    const cleanNumber = phoneValue.replace(/-/g, '');


    console.log("Final number:", cleanNumber); 
    console.log("Final Name:", nameValue); 
    console.log("Submission Status:", isSubmitted ? "Not Submitted" : "Submitted"); // Log the submission status, toggled from its previous state

    console.log(getClassesByEmail, "classID")
    const studentId = createNewStudent({studentName: nameValue, studentPhoneNumber: cleanNumber, classId: getClassesByEmail});
    console.log(studentId, "studentID")
    createNewClassIfNotExists({teacherEmail: email})
    console.log("teacherEmail: ", email)
    console.log(studentId, "studentID")
    if(studentId){
      addStudentToClass({studentId: studentId, teacherEmail: email})
    }

  };

  // Determine if the submit button should be enabled
  const isSubmitEnabled = useMemo(() => {
    const cleanNumber = phoneValue.replace(/-/g, '');
    return nameValue.length > 0 && cleanNumber.length === 10;
  }, [phoneValue, nameValue]);

  if (isSubmitted) {
    return (
      <div
        key="1"
        className="flex flex-col items-center justify-center min-h-screen gap-4 p-6 text-center bg-black text-white"
      >
        <h1 className="text-7xl font-extrabold text-orange-500">Success! 🎉</h1>
      <p className="text-xl text-gray-500">You've been added to the class!</p>
      <div className="mt-6">
        <p className="text-2xl">Keep an 👁️ on your text messages</p>
      </div>
      </div>
    );
  } else {
    return (
      <div
        key="1"
        className="flex flex-col items-center justify-center min-h-screen gap-4 p-6 text-center bg-black text-white"
      >
        <h1 className="text-7xl font-extrabold mb-2">Join your</h1>
        <h1 className="text-7xl font-extrabold mb-10"><span className="text-orange-500">Ta.ai</span> class</h1>
          <div className="flex flex-col gap-4 ">
            <form onSubmit={handleSubmit} className="w-full items-center gap-2">
              <div className="flex flex-col gap-4 w-full">
                <input
                  type="text"
                  id="nameInput"
                  value={nameValue}
                  onChange={handleNameChange}
                  placeholder="Enter your name"
                  className="h-12 px-4 py-2 text-xl rounded-full border-none shadow-lg text-black mb-4"
                  style={{ backgroundColor: 'white' }}
                />
                <div className="flex items-center gap-2 rounded-full" style={{backgroundColor: '#9A9A9A'}}>
                  <p className="text-2xl text-500 font-bold pl-4">+1</p>
                  <input
                    type="tel"
                    id="numberInput"
                    value={phoneValue}
                    onChange={handlePhoneChange}
                    placeholder="Enter your number"
                    maxLength={12}
                    className="h-12 px-4 py-2 text-xl rounded-full border-none shadow-lg text-black"
                    style={{ backgroundColor: 'white' }}
                  />
                </div>
              </div>
              <div className="mt-8">
                <button type="submit" disabled={!isSubmitEnabled} className={`px-6 py-2 transition-opacity duration-500 ${isSubmitEnabled ? 'bg-orange-500 opacity-100' : 'bg-gray-500 opacity-0'} text-white rounded-full text-xl shadow-lg self-center`}>Submit</button>
              </div>
            </form>
        </div>
      </div>
    );
  }
};