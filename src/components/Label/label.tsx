import { LabelProps } from "./types";

const Label = ({ children, name }: LabelProps) => {
  return (
    <label className="text-purple-1000 text-sm font-medium" htmlFor={name}>
      {children}
    </label>
  );
};

export default Label;
