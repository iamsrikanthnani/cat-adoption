import { useAuthContext } from "@/contexts/auth";
import { TYPE_CAT } from "@/types";
import { HeartIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cat = ({ cat }: { cat: TYPE_CAT }) => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer relative h-44 w-44 rounded-md overflow-hidden"
      style={{
        backgroundImage: `url('${cat.images[0]}')`,
        backgroundSize: "cover",
        backgroundColor: "white",
      }}
      onClick={() => navigate(`/cat/view/${cat.id}`)}
    >
      {isAuthenticated && (
        <div className="p-1 absolute top-3 z-50 right-2 cursor-pointer bg-gray-300 hover:bg-[#E6E6C2] shadow-md rounded-md">
          <HeartIcon width={20} height={20} color="#000033" />
        </div>
      )}
      <div className="select-none absolute bottom-2 left-2 bg-white w-40 text-center rounded-md text-black text-sm font-semibold py-1 shadow-md">
        {cat.name} ({cat.age})
      </div>
    </div>
  );
};

export default Cat;
