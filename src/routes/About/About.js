import React, {useState} from "react";

export default function Demo(props) {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
    const { onChange } = props;
    onChange && onChange(!open);
  }

  return (
    <div>
      <span>About Page: </span>
      <button onClick={handleClick}>switch open: {String(open)}</button>
    </div>
  );
}
