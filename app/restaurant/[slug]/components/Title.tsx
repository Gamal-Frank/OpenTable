import { restaurantSlug } from "../page";

interface props {
  restaurantSlug:restaurantSlug
}

const Title = ({restaurantSlug}:props) => {
  return (
    <div className="mt-4 border-b pb-6">
      <h1 className="font-bold text-6xl">{restaurantSlug.name}</h1>
    </div>
  );
};

export default Title;
