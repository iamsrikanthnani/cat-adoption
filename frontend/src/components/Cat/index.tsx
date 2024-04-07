import { useAuthContext } from "@/contexts/auth";
import { HeartIcon } from "lucide-react";

const Cat = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <div
      className="cursor-pointer relative h-44 w-44 rounded-md overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1495360010541-f48722b34f7d')",
        backgroundSize: "cover",
      }}
    >
      {isAuthenticated && (
        <div className="p-1 absolute top-3 z-50 right-2 cursor-pointer bg-gray-300 hover:bg-[#E6E6C2] shadow-md rounded-md">
          <HeartIcon width={20} height={20} color="#000033" />
        </div>
      )}
      <div className="select-none absolute bottom-2 left-2 bg-white w-40 text-center rounded-md text-black text-sm font-semibold py-1">
        Cat Name
      </div>
    </div>
  );
};

export default Cat;
