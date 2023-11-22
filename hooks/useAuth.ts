import { AuthenticationContext } from "@/app/context/AuthContext";
import axios from "axios";
import { deleteCookie } from "cookies-next";
import { useContext } from "react";

const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);
  const signIn = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({ data: null, error: null, loading: true });

    try {
      const res = await axios.post("http://localhost:3000/api/auth/signin", {
        email,
        password,
      });
      setAuthState({ data: res.data, error: null, loading: false });
      handleClose();
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };
  const signUp = async (
    {
      email,
      password,
      city,
      phone,
      firstName,
      lastName,
    }: {
      email: string;
      password: string;
      city: string;
      phone: string;
      firstName: string;
      lastName: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({ data: null, error: null, loading: true });

    try {
      const res = await axios.post("http://localhost:3000/api/auth/signup", {
        email,
        password,
        city,
        phone,
        firstName,
        lastName,
      });
      setAuthState({ data: res.data, error: null, loading: false });
      handleClose();
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };

  const signOut = () => {
    deleteCookie("jwt");
    setAuthState({
      data: null,
      error: null,
      loading: false,
    });
  };
  return {
    signIn,
    signUp,
    signOut
  };
};

export default useAuth;
