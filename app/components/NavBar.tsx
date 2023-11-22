"use client";
import Link from "next/link";
import LoginModal from "./AuthModal";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import { Avatar, Button, CircularProgress } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import useAuth from "@/hooks/useAuth";

const NavBar = () => {
  const { data, loading } = useContext(AuthenticationContext);
  const {signOut}= useAuth()

  return (
    <nav className="bg-white p-2 px-5 flex justify-between w-screen ">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div>
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          <div className="flex  ">
            {data ? (
              <div className="flex gap-5">
                <button onClick={signOut} className=" uppercase bg-blue-400 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400">
                  Logout
                </button>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>
                  {data.firstName[0] + data.firstName[1].toUpperCase()}
                </Avatar>
              </div>
            ) : (
              <div className="flex">
                <LoginModal isSignIn />
                <LoginModal isSignIn={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
