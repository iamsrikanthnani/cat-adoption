import Cat from "@/components/Cat";
import Header from "@/components/Header";
import Filters from "./Filters";
import { useCats } from "@/hooks";
import { LoaderIcon } from "lucide-react";
import { TYPE_CAT } from "@/types";

const Home = () => {
  const { data, isLoading } = useCats({ enabled: true });

  return (
    <div className="w-screen h-screen overflow-y-scroll bg-[#E6E6C2]">
      <Header />
      <Filters />
      {isLoading ? (
        <div className="flex justify-center mt-24 w-full">
          <LoaderIcon className="mr-2 h-12 w-12 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6  mx-8 sm:mx-8 md:mx-16 pb-16 mt-8 items-start">
          {data?.map((cat: TYPE_CAT, index: number) => (
            <Cat cat={cat} key={`cat-${index}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
