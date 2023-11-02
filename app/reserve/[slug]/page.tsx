/* eslint-disable react/no-unescaped-entities */

import Header from "./components/Header";
import Form from "./components/Form";

/* eslint-disable @next/next/no-img-element */
const Reserve = () => {
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header />
        <Form />
      </div>
    </div>
  );
};

export default Reserve;
