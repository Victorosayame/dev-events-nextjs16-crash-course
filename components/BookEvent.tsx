//step17 create a new component called BookEvent in the components folder, this component will be used to book an event, it will receive the event details as props and display them in a form, the user can then fill the form and submit it to book the event, you can use the same prompt to generate the code or you can use junie to generate the code, both will work just fine, we have tested both and they work just fine, you can choose either one of them to generate the code, we have also added comments to explain the code, you can read the comments to understand the code better, if you have any questions feel free to ask us, we are here to help you.
"use client"

import { useState } from "react";


const BookEvent = () => {
  //check if this user have already submitted their email t join this event
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTimeout(() => {
      setSubmitted(true);
    }, 1000)
  }
  return (
    <div id="book-event">{submitted ? (<p className="text-sm">Thank you for signing up!</p>): (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Enter your email address" />
        </div>

        <button type="submit" className="button-submit">
          Submit
        </button>
      </form>
    )}</div>
  )
}

export default BookEvent