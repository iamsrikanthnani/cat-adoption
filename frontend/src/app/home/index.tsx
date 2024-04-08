import Cat from "@/components/Cat";
import Header from "@/components/Header";
import Filters from "./Filters";
import { useCats } from "@/hooks";
import { LoaderIcon } from "lucide-react";
import { TYPE_CAT } from "@/types";

const Home = () => {
  const { data, isLoading } = useCats();

  return (
    <div className="w-screen h-screen overflow-y-scroll bg-[#E6E6C2]">
      <Header />
      <Filters />
      {isLoading ? (
        <div className="flex justify-center mt-24 w-full">
          <LoaderIcon className="mr-2 h-12 w-12 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-5 mx-6 md:mx-16 pb-16 mt-8 items-center">
          {data?.map((cat: TYPE_CAT, index: number) => (
            <Cat cat={cat} key={`cat-${index}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
