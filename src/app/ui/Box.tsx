import React from "react";

interface Props {
  classNames?: string;
}

export default function Box(props: React.PropsWithChildren<Props>) {
  const { children, classNames } = props;

  return (
    <div
      className={`border rounded-lg p-4 flex flex-col gap-4 ${classNames}`}
    >
      {children}
    </div>
  );
}
