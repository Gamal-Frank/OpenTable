import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface props {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isSignIn: boolean;
}
export default function AuthModelInputs({
  inputs,
  handleChange,
  isSignIn,
}: props) {
  return (
    <div>
      {!isSignIn && (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            placeholder="First Name"
            className="border rounded p-2 py-3 w-[49%]"
            value={inputs.firstName}
            onChange={handleChange}
            name="firstName"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border rounded p-2 py-3 w-[49%]"
            value={inputs.lastName}
            onChange={handleChange}
            name="lastName"
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="email"
          placeholder="Email"
          className="border rounded p-2 py-3 w-full"
          value={inputs.email}
          onChange={handleChange}
          name="email"
        />
      </div>
      {!isSignIn && (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            placeholder="Phone"
            className="border rounded p-2 py-3 w-[49%]"
            value={inputs.phone}
            onChange={handleChange}
            name="phone"
          />
          <input
            type="text"
            placeholder="City"
            className="border rounded p-2 py-3 w-[49%]"
            value={inputs.city}
            onChange={handleChange}
            name="city"
          />
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          placeholder="Password"
          className="border rounded p-2 py-3 w-full"
          value={inputs.password}
          onChange={handleChange}
          name="password"
        />
      </div>
    </div>
  );
}
