import { FC } from "react";

type Props = {
  children: string;
};

const Warning: FC<Props> = ({ children }) => {
  return (
    <div className="my-16 flex justify-center items-center flex-col gap-2">
      {children}
    </div>
  );
};

export default Warning;
