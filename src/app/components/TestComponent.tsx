import React from "react";
interface Props {
  icon: string;
  title: string;
  content: string;
  num: string;
}
const TestComponent = ({ icon, title, content, num }: Props) => {
  return (
    <div className="flex flex-col gap-5 items-center">
      <img src={`${icon}.png`}></img>
      <h5 data-label-id="0">{title}</h5>
      <p className="desc">{content}</p>
      <p className="text-5xl">{num}</p>
    </div>
  );
};

export default TestComponent;
