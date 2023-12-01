/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { partySize } from "@/data";
import { Time, convertToDisplayTime } from "@/utils/convertToDisplayTime";
import { format } from "date-fns";
import React from "react";
interface props {
  image: string;
  name: string;
  searchParams: { date: string; partySize: string; };
}
export default function Header({ image, name,searchParams }: props) {
  const[day,time]=searchParams.date.split("T")
  return (
    <div>
      <h3 className="font-bold">You're almost done!</h3>
      <div className="mt-5 flex">
        <img src={image} alt="" className="w-32 h-18 rounded" />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex mt-3">
            <p className="mr-6">{format(new Date(day),"ccc, LLL d")}</p>
            <p className="mr-6">{convertToDisplayTime(time as Time)}</p>
            <p className="mr-6">{searchParams.partySize} {parseInt(searchParams.partySize) === 1 ?"person": "people"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
