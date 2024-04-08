import { useAuthContext } from "@/contexts/auth";
import { useFavorites } from "@/hooks";
import { TYPE_CAT } from "@/types";
import { HeartIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cat = ({ cat }: { cat: TYPE_CAT }) => {
  const { user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const isFavorites = window.location.pathname.includes("/favorites");

  const { onAddOrRemove } = useFavorites({
    enabled: false,
  });

  // toggle favorite
  const toggleFavorite = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    catId: number,
    isAdd: boolean
  ) => {
    e.stopPropagation();
    onAddOrRemove(catId, isAdd ? "remove" : "add");
  };

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
        <div
          onClick={(e) =>
            toggleFavorite(
              e,
              cat?.id,
              isFavorites
                ? isFavorites
                : cat?.favorites?.some(
                    (favorite: { user: { id: number } }) =>
                      favorite?.user?.id === user?.id
                  )
            )
          }
          className="p-1 absolute top-3 z-50 right-2 cursor-pointer bg-gray-300 hover:bg-[#E6E6C2] shadow-md rounded-md"
        >
          <HeartIcon
            width={20}
            height={20}
            fill={
              isFavorites ||
              cat?.favorites?.some(
                (favorite: { user: { id: number } }) =>
                  favorite?.user?.id === user?.id
              )
                ? "red"
                : "transparent"
            }
            color={
              isFavorites ||
              cat?.favorites?.some(
                (favorite: { user: { id: number } }) =>
                  favorite?.user?.id === user?.id
              )
                ? "red"
                : "#000033"
            }
          />
        </div>
      )}
      <div className="select-none absolute bottom-2 left-2 bg-white w-40 text-center rounded-md text-black text-sm font-semibold py-1 shadow-md">
        {cat.name} ({cat.age})
      </div>
    </div>
  );
};

export default Cat;
