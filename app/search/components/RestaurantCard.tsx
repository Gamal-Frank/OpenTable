import Price from "@/app/components/Price";
import Stars from "@/app/components/Stars";
import { CalculateRatingsAverage } from "@/utils/CalculateRatingsAverage";
import { Cuisine, Location, PRICE, Review } from "@prisma/client";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export interface restaurant {
  id: number;
  name: string;
  main_image: string;
  location: Location;
  price: PRICE;
  cuisine: Cuisine;
  slug: string;
  reviews: Review[];
}

interface props {
  restaurant: restaurant;
}
const RestaurantCard = ({ restaurant }: props) => {
  const renderdRating = ()=>{
const rating = CalculateRatingsAverage(restaurant.reviews)
if(rating > 4) return "Awesome"
else if (rating <= 4 && rating > 3) return "Good"
else if (rating <= 3 && rating >2) return "Average"
else ""
  }
  
  return (
    <div className="border-b flex pb-5 ml-7">
      <img src={restaurant.main_image} alt="" className="w-44 h-36 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <Stars reviews={restaurant.reviews} />
          <p className="ml-2 text-sm">{renderdRating()}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
