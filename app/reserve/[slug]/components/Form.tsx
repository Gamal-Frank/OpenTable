"use client";
import useReservation from "@/hooks/useReservation";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Form({
  slug,
  date,
  partySize,
}: {
  slug: string;
  date: string;
  partySize: number;
}) {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    occasion: "",
    requests: "",
  });
  const [day, time] = date.split("T");
  const [didBook, setDidBook] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const { loading, error, createReservation } = useReservation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (
      inputs.firstName &&
      inputs.lastName &&
      inputs.email &&
      inputs.phoneNumber
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [inputs]);

  const handleClick = async () => {
    const booking = await createReservation({
      slug,
      partySize,
      day,
      time,
      bookerEmail:inputs.email,
      bookerPhone:inputs.phoneNumber,
      bookerFirstName:inputs.firstName,
      bookerLastName:inputs.lastName,
      bookerOccasion:inputs.occasion,
      bookerRequest:inputs.requests,
      setDidBook,
    });
  };

  console.log(didBook);
  
  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      {didBook ? (
        <div>
          <h1>you are all booked up</h1>
          <p>enjoy your reservation</p>
        </div>
      ) : (
        <div>
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="First name"
            value={inputs.firstName}
            name="firstName"
            onChange={handleChange}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Last name"
            name="lastName"
            value={inputs.lastName}
            onChange={handleChange}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Phone number"
            name="phoneNumber"
            value={inputs.phoneNumber}
            onChange={handleChange}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Occasion (optional)"
            name="occasion"
            value={inputs.occasion}
            onChange={handleChange}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Requests (optional)"
            value={inputs.requests}
            name="requests"
            onChange={handleChange}
          />
          <button
            disabled={disabled || loading}
            onClick={handleClick}
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              " Complete reservation"
            )}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </div>
      )}
    </div>
  );
}
