import "./assets/css/reset.css";
import "./assets/css/global.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Tooltip } from "react-tooltip";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Toaster
      toastOptions={{
        duration: 5000,
        className: "toasterclass",
      }}
    />
    <Tooltip id="tooltip" className="tooltipclass" />
    <App />
  </>
);
