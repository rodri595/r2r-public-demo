import "./style.css";

const Icon = ({
  size,
  viewbox = "0 0 24 24",
  name,
  color,
  className,
  ...props
}) => {
  return (
    <svg
      version="1.1"
      xmins="http://www.w3.org/2000/svg"
      xlink="http://www.w3.org/1999/xlink"
      className={`icon-svg unselectable ${className ? className : ""}`}
      width={size || 24}
      height={size || 24}
      viewBox={viewbox}
      {...props}
    >
      <use xlinkHref={`#${name}`} color={color}></use>
    </svg>
  );
};

export default Icon;
