import Icon from "../Icon";
import "./style.css";

const Button = ({
  className,
  full,
  box,
  children,
  icon_left,
  icon_right,
  secondary,
  danger,
  success,
  warning,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`button--container  aic ${className ? className : ""} ${
        secondary ? "button-secondary" : ""
      } ${danger ? "button-danger" : ""}  ${success ? "button-success" : ""} ${
        warning ? "button-warning" : ""
      } ${full ? "button-full" : ""}  ${box ? "button-box" : ""}`}
    >
      {icon_left && <Icon name={icon_left} size="16" />}
      {children}
      {icon_right && <Icon name={icon_right} size="16" />}
    </button>
  );
};

export default Button;
