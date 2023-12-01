/* eslint-disable react/no-unescaped-entities */

import Header from "./components/Header";
import Form from "./components/Form";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

/* eslint-disable @next/next/no-img-element */
const prisma = new PrismaClient();
const fetchRestaurantBySlug = async (slug:string) => {
const restaurant = await prisma.restaurant.findUnique({
  where:{
    slug
  },
})
if(!restaurant) {notFound()}
return restaurant
};

const Reserve = async ({ params,searchParams }: { params: { slug: string },searchParams:{date:string,partySize:string}}) => {
  const restaurant = await fetchRestaurantBySlug(params.slug)
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header searchParams={searchParams} image={restaurant.main_image} name={restaurant.name} />
        <Form slug={params.slug} date={searchParams.date} partySize={parseInt(searchParams.partySize)} />
      </div>
    </div>
  );
};

export default Reserve;
