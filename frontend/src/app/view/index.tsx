import Header from "@/components/Header";
import { useAuthContext } from "@/contexts/auth";
import { useCats } from "@/hooks";
import { LoaderIcon, PencilIcon, Trash2 } from "lucide-react";

const CatView = () => {
  const { data, isLoading, deleteCat, deleteCatMutation, onClickEdit } =
    useCats({ enabled: true });
  const { isAuthenticated, user } = useAuthContext();
  return (
    <div className="w-screen h-screen overflow-y-scroll bg-[#E6E6C2]">
      <Header />
      cat view
      <div className="mt-24">
        {isLoading ? (
          <div className="flex justify-center mt-24 w-full">
            <LoaderIcon className="mr-2 h-12 w-12 animate-spin" />
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <div>
              <img
                src={data?.images[0]}
                className="w-[300px] h-[300px] rounded-md shadow-md"
                style={{ objectFit: "cover" }}
              />

              <div className="gap-6 mt-4 bg-white rounded-md p-3 justify-end w-[300px]">
                <div className="flex flex-col">
                  <p className="text-4xl font-semibold">{data?.name}</p>

                  <p className="text-lg">
                    {data?.age} years old, {data?.gender}, {data?.breed}
                  </p>
                </div>
                {isAuthenticated &&
                  user?.role === "admin" &&
                  data?.user?.id === user?.id && (
                    <div className="flex flex-row gap-2 justify-end">
                      {deleteCatMutation.isPending ? (
                        <LoaderIcon className="h-[2rem] w-[2rem] animate-spin" />
                      ) : (
                        <Trash2
                          onClick={deleteCat}
                          className="cursor-pointer w-8 h-8 p-1 hover:bg-[#E6E6C2] rounded-md"
                        />
                      )}
                      <PencilIcon
                        onClick={onClickEdit}
                        className="cursor-pointer w-8 h-8 p-1 hover:bg-[#E6E6C2] rounded-md"
                      />
                    </div>
                  )}
              </div>

              <div className="flex flex-row mt-4 gap-4">
                {data?.images.slice(1).map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    className="w-[90px] h-[90px] rounded-md shadow-md"
                    style={{ objectFit: "cover" }}
                    alt={`Image ${index}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatView;
