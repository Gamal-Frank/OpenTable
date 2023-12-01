"use client";
import { partySize, times } from "@/data";
import useAvaiablities from "@/hooks/useAvailablities";
import { Time, convertToDisplayTime } from "@/utils/convertToDisplayTime";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReservationCard = ({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState(openTime);
  const [partySizeState, setPartySizeState] = useState(2);
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);
  const { data, loading, error, fetchAvailabilities } = useAvaiablities();
  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split("T")[0]);
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };

  const handleClick = () => {
    fetchAvailabilities({
      slug,
      day,
      time,
      partySize: partySizeState,
    });
  };
  const filterTimes = () => {
    const timesInWindow: typeof times = [];
    let isWithinWindow = false;
    times.forEach((time) => {
      if (time.time === openTime) {
        isWithinWindow = true;
      }
      if (isWithinWindow) {
        timesInWindow.push(time);
      }
      if (time.time === closeTime) {
        isWithinWindow = false;
      }
    });

    return timesInWindow;
  };

  return (
    <div className=" w-[300px] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select
          value={partySizeState}
          onChange={(e) => setPartySizeState(parseInt(e.target.value))}
          name=""
          className="py-3 border-b font-light"
          id=""
        >
          {partySize.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker
            wrapperClassName="w-[48%]"
            dateFormat="MMMM d"
            className="py-3 border-b font-medium text-xs w-20 "
            selected={selectedDate}
            onChange={handleChangeDate}
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            name=""
            id=""
            className="py-3 border-b font-medium"
          >
            {filterTimes().map((option, index) => {
              return (
                <option key={index} value={option.time}>
                  {option.displayTime}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          onClick={handleClick}
          className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
          disabled={loading}
        >
          {loading ? <CircularProgress color="inherit" /> : "Find a Time"}
        </button>
      </div>
      {data && data.length ? (
        <div className="mt-4">
          <p className=" font-medium">select time</p>
          <div className="flex flex-wrap mt-2">
            {data.map((t, index) => {
              return t.available ? (
                <Link
                  href={`/reserve/${slug}?date=${day}T${t.time}&partySize=${partySizeState}`}
                  className="bg-red-600 ml-3 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded "
                  key={index}
                >
                  <p className="text-sm font-bold">
                    {convertToDisplayTime(t.time as Time)}
                  </p>
                </Link>
              ) : (
                <div
                  className=" bg-gray-300 p-2 ml-3 w-24 mb-3 h-9 rounded"
                  key={index}
                ></div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReservationCard;
