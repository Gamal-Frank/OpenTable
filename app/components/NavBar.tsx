import Link from "next/link";
import LoginModal from "./AuthModal";

const NavBar = () => {
  return (
    <nav className="bg-white p-2 px-5 flex justify-between w-screen ">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div>
        <div className="flex ">
          <LoginModal isSignIn />
          <LoginModal isSignIn={false} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
