import fullStar from "../../public/icons/full-star.png";
import halfStar from "../../public/icons/half-star.png";
import emptyStar from "../../public/icons/empty-star.png";
import Image from "next/image";
import { Review } from "@prisma/client";
import { CalculateRatingsAverage } from "@/utils/CalculateRatingsAverage";

export default function Stars({
  reviews,
  rating,
}: {
  reviews: Review[];
  rating?: number;
}) {
  const r = rating || CalculateRatingsAverage(reviews);
  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const diff = parseFloat((r - i).toFixed(1));
      if (diff >= 1) stars.push(fullStar);
      else if (diff < 1 && diff > 0) {
        if (diff <= 0.2) stars.push(emptyStar);
        else if (diff > 0.2 && diff <= 0.6) stars.push(halfStar);
        else stars.push(fullStar);
      } else stars.push(emptyStar);
    }
    return stars.map((star, index) => {
      return (
        <Image key={index} alt="star" className="w-4 h-4 mr-1" src={star} />
      );
    });
  };
  return <div className="flex items-center">{renderStars()}</div>;
}
