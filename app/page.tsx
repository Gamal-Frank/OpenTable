import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import { Cuisine, Location, PRICE, PrismaClient, Review } from "@prisma/client";

export interface RestaurantCardTypes {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
  reviews: Review[];
}
const prisma = new PrismaClient();
const fetchRestaurants = async (): Promise<RestaurantCardTypes[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      slug: true,
      reviews: true,
    },
  });
  return restaurants;
};

export default async function Home() {
  const restaurants = await fetchRestaurants();

  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map((restaurant) => {
          return <RestaurantCard restaurant={restaurant} key={restaurant.id} />;
        })}
      </div>
    </main>
  );
}

//1MFT8mNKrxAtYUZO
