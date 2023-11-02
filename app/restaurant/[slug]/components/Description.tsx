import { restaurantSlug } from "../page";

interface props {
  restaurantSlug: restaurantSlug;
}

const Description = ({ restaurantSlug }: props) => {
  return (
    <div className="mt-4">
      <p className="text-lg font-light">{restaurantSlug.description}</p>
    </div>
  );
};

export default Description;
