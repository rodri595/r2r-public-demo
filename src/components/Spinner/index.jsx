import "./style.css";
import Lottie from "lottie-react";
import loading_animation from "../../assets/animations/loading.json";
const Spinner = ({ full, size = "40px", children }) => {
  return (
    <div
      className={` ${
        full ? "spinner-full" : ""
      } spinner--container aic unselectable`}
    >
      <Lottie
        animationData={loading_animation}
        loop={true}
        style={{
          width: size,
          height: "20px",
        }}
      />
      {children}
    </div>
  );
};
export default Spinner;
