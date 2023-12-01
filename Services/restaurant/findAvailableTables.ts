import { times } from "@/data";
import { PrismaClient, Table } from "@prisma/client";
import { NextApiResponse } from "next";

const prisma = new PrismaClient();

export const findAvailableTables = async ({
  time,
  day,
  res,
  restaurant,
}: {
  time: string;
  day: string;
  res: NextApiResponse;
  restaurant: {
    tables: Table[];
    open_time: string;
    close_time: string;
  };
}) => {
  const searchTimes = times.find((t) => {
    return t.time === time;
  })?.searchTimes;

  if (!searchTimes) {
    return res.status(401).json({
      errorMessage: "invalid data provided",
    });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lt: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },

    select: {
      number_of_people: true,
      booking_time: true,
      table: true,
    },
  });

  const bookingTableObj: { [key: string]: { [key: number]: true } } = {};
  bookings.forEach((booking) => {
    bookingTableObj[booking.booking_time.toISOString()] = booking.table.reduce(
      (obj, table) => {
        return {
          ...obj,
          [table.table_id]: true,
        };
      },
      {}
    );
  });

  const tables = restaurant.tables;

  const searchTimesWithTables = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables: tables,
    };
  });

  return searchTimesWithTables;
};
