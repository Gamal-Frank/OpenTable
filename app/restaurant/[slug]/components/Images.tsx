import { restaurantSlug } from "../page";

/* eslint-disable @next/next/no-img-element */
interface props {
  restaurantSlug: restaurantSlug;
}

const Images = ({ restaurantSlug }: props) => {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">{restaurantSlug.images.length} photo{restaurantSlug.images.length===1?"":"s"}</h1>
      <div className="flex flex-wrap">
        {restaurantSlug.images.map((img, index) => {
          return (
            <img
            key={index}
              className="w-56 h-44 mr-1 mb-1"
              src={img}
              alt=""
            />
          );
        })}
      </div>
    </div>
  );
};

export default Images;
