type OnChangeFunction = {
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>;
  setInputs: React.Dispatch<React.SetStateAction<any>>;
  setInputErrors: React.Dispatch<React.SetStateAction<any>>;
};

export const inputOnChange = ({
  e,
  setInputs,
  setInputErrors,
}: OnChangeFunction) => {
  // ON INPUT CHANGE(setting value based on input name)
  const onChange = () => {
    const { name, value } = e.target;

    // Clear the error for the current input
    setInputErrors((prevErrors: any) => ({ ...prevErrors, [name]: "" }));

    // Update the inputs state
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      [name]: value.trimStart(),
    }));
  };

  return onChange;
};
