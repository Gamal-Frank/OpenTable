import { Item } from "@prisma/client";
import MenuCard from "./MenuCard";

const Menu = ({ menu }: { menu: Item[] }) => {
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        {menu.length ? (
          <div className="flex flex-wrap justify-between">
            {menu.map((item, index) => {
              return <MenuCard item={item} key={index} />;
            })}
          </div>
        ) : (
          <div className="flex flex-wrap justify-between">
            <p> this restaurant doesnt have a menu</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Menu;
