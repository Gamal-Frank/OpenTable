import { CalculateRatingsAverage } from "@/utils/CalculateRatingsAverage";
import { restaurantSlug } from "../page";
import Stars from "@/app/components/Stars";

interface props {
  restaurantSlug:restaurantSlug
}

const Rating = ({ restaurantSlug }: props) => {
  const renderdRating = ()=>{
    const rating = CalculateRatingsAverage(restaurantSlug.reviews)
  return rating}
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars reviews={restaurantSlug.reviews} />
        <p  className="text-reg ml-3">{renderdRating().toFixed(1)}</p>
      </div>
      <div>
        <p className="text-reg ml-4">{restaurantSlug.reviews.length} {restaurantSlug.reviews.length===1?"review":"reviews"}</p>
      </div>
    </div>
  );
};

export default Rating;
