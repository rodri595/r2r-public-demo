import "./style.css";
import temp from "../..//assets/img/misc/temp.svg";
const Img = ({ className, alt, src, lazy, ...props }) => {
  return (
    <figure className={`img-figure aic ${className}`} {...props}>
      <img
        src={src || temp}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = temp;
        }}
        draggable="false"
        loading={lazy ? "lazy" : "eager"}
        alt={alt || ""}
        className="img-img unselectable"
        referrerPolicy="no-referrer"
      />
    </figure>
  );
};

export default Img;
