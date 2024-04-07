import { Input } from "@/components/ui/input";
import { CatIcon, XIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Filters = () => {
  return (
    <div className="flex justify-between mx-16 bg-white mt-24 rounded-md shadow-lg content-center px-4 py-4">
      <CatIcon
        width={44}
        height={44}
        className="p-2 bg-[#E6E6C2] rounded-[100px] border border-yellow-950"
      />
      <div className="flex gap-2">
        <Input placeholder="Search cat..." className="w-[18vw]" />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Input
              placeholder="Select gender..."
              className="w-[18vw] pointer-events-none"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[18vw]">
            <DropdownMenuItem>Male</DropdownMenuItem>
            <DropdownMenuItem>Female</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2">
              <XIcon width={16} height={16} />
              Clear
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Input
              placeholder="Select breed..."
              className="w-[18vw] pointer-events-none"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[18vw]">
            <DropdownMenuItem>Breed1</DropdownMenuItem>
            <DropdownMenuItem>Breed2</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2">
              <XIcon width={16} height={16} />
              Clear
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Filters;
