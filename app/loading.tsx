import React from "react";
import Header from "./components/Header";

export default function Loading() {
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex gap-7 flex-wrap justify-center">
          {new Array(12).fill(null).map((num,index) => {
            return (
              <div
                className=" animate-pulse m-3 bg-slate-200 w-64 h-72 rounded overflow-hidden border cursor-pointer"
                key={index}
              />
            );
          })}
      </div>
    </main>
  );
}
