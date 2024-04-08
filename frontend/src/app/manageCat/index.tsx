import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useManageCat } from "@/hooks";
import { inputOnChange } from "@/lib/inputOnChange";
import { LoaderIcon, TrashIcon, PlusIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ManageCat = () => {
  const {
    catData,
    inputErrors,
    manageCat,
    setInputs,
    setInputErrors,
    mutation,
    handleRemoveImage,
    handleAddImage,
    image,
    setImage,
    isCatEdit,
  } = useManageCat();

  return (
    <div className="mx-auto flex w-full flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-[30vw] h-screen sm:h-screen md:h-full overflow-y-scroll pb-16 bg-[#E6E6C2]">
      {/* Title and description */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold tracking-tight">
          {isCatEdit ? "Update Cat" : "Add a Cat"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isCatEdit
            ? "Please update the fields to modify the cat information"
            : "Please complete the required fields to add a new cat"}
        </p>
      </div>

      {/* Form elements */}
      <div className="grid gap-4 mt-4">
        {/* Name input */}
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            placeholder="Cat's Name"
            value={catData.name}
            onChange={(e) => inputOnChange({ e, setInputs, setInputErrors })()}
          />
          {inputErrors.name && (
            <p className="text-red-500 text-sm">{inputErrors.name}</p>
          )}
        </div>

        {/* Age input */}
        <div className="grid gap-2">
          <Label htmlFor="age">Age</Label>
          <Input
            name="age"
            placeholder="Cat's Age"
            type="number"
            value={catData.age}
            onChange={(e) => inputOnChange({ e, setInputs, setInputErrors })()}
          />
          {inputErrors.age && (
            <p className="text-red-500 text-sm">{inputErrors.age}</p>
          )}
        </div>

        {/* Breed input */}
        <div className="grid gap-2">
          <Label htmlFor="breed">Breed</Label>
          <Input
            name="breed"
            placeholder="Cat's Breed"
            value={catData.breed}
            onChange={(e) => inputOnChange({ e, setInputs, setInputErrors })()}
          />
          {inputErrors.breed && (
            <p className="text-red-500 text-sm">{inputErrors.breed}</p>
          )}
        </div>

        {/* Gender radio group */}
        <div className="flex gap-2 items-center">
          <Label htmlFor="gender">Gender</Label>
          <RadioGroup
            className="flex items-center"
            defaultValue={catData.gender}
            onValueChange={(selectedValue) =>
              setInputs({ ...catData, gender: selectedValue })
            }
          >
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">Male</Label>
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">Female</Label>
          </RadioGroup>
          {inputErrors.gender && (
            <p className="text-red-500 text-sm">{inputErrors.gender}</p>
          )}
        </div>

        {/* Images section */}
        <Label htmlFor="images">Images</Label>
        <div className="flex gap-4">
          {catData.images.map((image, index) => (
            <div
              key={index}
              className="relative w-32 h-32 rounded-md overflow-hidden"
            >
              <div
                className="cursor-pointer p-2 absolute top-1 right-1 bg-gray-500 shadow-md hover:bg-[#E6E6C2] rounded-md"
                onClick={() => handleRemoveImage(index)}
              >
                <TrashIcon width={16} height={16} />
              </div>
              <img
                src={image}
                alt={`Cat Image ${index}`}
                className="w-32 h-32"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        {/* Add image input */}
        <div className="flex items-center justify-between gap-2">
          <Input
            name="images"
            placeholder="Enter Cat Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Button onClick={handleAddImage}>Add image</Button>
        </div>

        {/* Display image errors */}
        {inputErrors.images && (
          <p className="text-red-500 text-sm">{inputErrors.images}</p>
        )}

        {/* Submit button */}
        <Button onClick={manageCat}>
          {mutation.isPending && (
            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          {isCatEdit ? "Update Cat" : "Add Cat"}
        </Button>
      </div>
    </div>
  );
};

export default ManageCat;
