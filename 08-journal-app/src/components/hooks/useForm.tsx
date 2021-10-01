import { useState } from 'react';

export interface FormState {
  [keyName: string]: string;
}

interface FormType {
  formState: FormState;
  handleInputChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  resetForm: (x: FormState) => void;
}

export const useForm = (initialState = {}): FormType => {
  const [formState, setFormState] = useState<FormState>(initialState);

  const handleInputChange = ({
    target,
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>) => {
    const key = target?.name;
    const value = target?.value;
    setFormState({ ...formState, [key]: value });
  };

  const resetForm = (newState = {}) => {
    setFormState(newState);
  };

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   console.log(formState);
  // };

  return {
    formState,
    handleInputChange,
    resetForm,
    // handleSubmit,
  };
};
