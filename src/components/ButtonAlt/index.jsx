import Icon from "../Icon";
import "./style.css";

const ButtonAlt = ({
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
  small,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`ButtonAlt--container  aic ${className ? className : ""} ${
        secondary ? "ButtonAlt-secondary" : ""
      } ${danger ? "ButtonAlt-danger" : ""}  ${
        success ? "ButtonAlt-success" : ""
      } ${warning ? "ButtonAlt-warning" : ""} ${
        full ? "ButtonAlt-full" : ""
      }  ${box ? "ButtonAlt-box" : ""} ${small ? "ButtonAlt-small" : ""}`}
    >
      {icon_left && <Icon name={icon_left} size="16" />}
      {children}
      {icon_right && <Icon name={icon_right} size="16" />}
    </button>
  );
};

export default ButtonAlt;
