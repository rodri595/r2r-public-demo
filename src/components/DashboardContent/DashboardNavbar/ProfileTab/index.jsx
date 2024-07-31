import "./style.css";
import Image from "../..//../Image";
import Button from "../../../ButtonAlt";
import Icon from "../../../Icon";
import { shortenAddressLong } from "../../../../utils";
import toast from "react-hot-toast";
import { useDisconnect } from "wagmi";
import { useWalletProvider } from "../../../../context/WalletProvider";
import Spinner from "../../../Spinner";
import { useAccount } from "wagmi";
import defaultImg from "../../../../assets/img/misc/dollar-temp.png";
const ProfileTab = ({ alt, visible, close, open }) => {
  const { isLoadingSafeWallet, smartAccountAddress } = useWalletProvider();
  const { disconnect } = useDisconnect();
  const { connector: activeConnector, status } = useAccount();

  const copyToClipboard = (text) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      //fallback
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }

    toast.success("Copiado", {
      icon: "✅",
      time: 2000,
      position: "top-right",
    });
    close();
  };

  return (
    <>
      <div
        className={`anim ${
          visible ? "ProfileTab-backdrop" : "ProfileTab-backdrop-close"
        }`}
        onClick={() => close()}
      />
      <ul
        style={
          !open
            ? {
                right: "calc(((100vw - 1280px - 340px) / 2) + 40px)",
              }
            : {
                right: "calc(((100vw - 1280px ) / 2) )",
              }
        }
        className={` aic anim ${
          visible ? "ProfileTab--container" : `ProfileTab--container-close`
        }
        ${alt ? "ProfileTab--container-alt" : ""}        
        
        `}
      >
        <ul className="ProfileTab-links aic anim">
          {!!alt && (
            <div className="ProfileTab-close aic">
              <Icon name="x-close" onClick={() => close()} />
            </div>
          )}
          {isLoadingSafeWallet ? (
            <div className="anim ProfileTab-link aic hover">
              <Spinner />
            </div>
          ) : (
            <div
              className="anim ProfileTab-link aic hover"
              data-tooltip-id="tooltip"
              data-tooltip-content={smartAccountAddress}
              onClick={() => copyToClipboard(smartAccountAddress)}
            >
              <Icon name="wallet-03" className="star-rotate anim" />
              <span className="ProfileTab-link-name anim  ellipsis">
                {shortenAddressLong(smartAccountAddress)}
              </span>
            </div>
          )}
        </ul>
        <div className="ProfileTab-user aic anim">
          <Image src={defaultImg} className="ProfileTab-user-avatar hover" />
          <div className="ProfileTab-user-info aic">
            <span className="ProfileTab-user-sub ellipsis">
              {status + " with " + activeConnector?.name}
            </span>
          </div>
        </div>
        <ul className="ProfileTab-links2 aic anim">
          <div
            className="anim ProfileTab-link aic hover"
            data-tooltip-id="tooltip"
            data-tooltip-content={smartAccountAddress}
            onClick={() => copyToClipboard(smartAccountAddress)}
          >
            <Icon name="wallet-03" className="star-rotate anim" />
            <span className="ProfileTab-link-name anim  ellipsis">
              {shortenAddressLong(smartAccountAddress)}
            </span>
          </div>
        </ul>

        <Button
          icon_left="log-out-03"
          full
          box
          secondary
          onClick={() => disconnect()}
        >
          Cerrar Sesion
        </Button>
      </ul>
    </>
  );
};

export default ProfileTab;
