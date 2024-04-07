import Cat from "@/components/Cat";
import Header from "@/components/Header";
import Filters from "./Filters";

const Home = () => {
  return (
    <div className="w-screen h-screen overflow-y-scroll bg-[#E6E6C2]">
      <Header />
      <Filters />
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-5 mx-16 pb-16 mt-8">
        <Cat />
        <Cat />
      </div>
    </div>
  );
};

export default Home;
