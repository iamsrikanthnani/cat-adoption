import Cat from "@/components/Cat";
import { useFavorites } from "@/hooks";
import { TYPE_CAT } from "@/types";
import { LoaderIcon } from "lucide-react";

const Favorites = () => {
  const { favorites, favoritesIsLoading } = useFavorites({
    enabled: true,
  });

  return (
    <>
      <h1 className="text-2xl font-medium mx-8 sm:mx-8 md:mx-16 mb-4">
        Favorites
      </h1>
      {favoritesIsLoading ? (
        <div className="flex justify-center mt-24 w-full">
          <LoaderIcon className="mr-2 h-12 w-12 animate-spin" />
        </div>
      ) : favorites?.length === 0 ? (
        <div className="gap-6  mx-8 sm:mx-8 md:mx-16 pb-16 items-start">
          <p className="text-md">No Favorites found!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6  mx-8 sm:mx-8 md:mx-16 pb-16 items-start">
          {favorites?.map((fev: { cat: TYPE_CAT }, index: number) => (
            <Cat cat={fev?.cat} key={`cat-${index}`} />
          ))}
        </div>
      )}
    </>
  );
};

export default Favorites;
