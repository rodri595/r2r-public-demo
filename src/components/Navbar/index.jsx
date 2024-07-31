import { Link } from "react-router-dom";
import "./style.css";
import Image from "../Image";
import Button from "../Button";
import logo from "../../assets/img/brand/logo.png";
import { useState, memo } from "react";
import { useAccount, useConnect } from "wagmi";
import { useWalletProvider } from "../..//context/WalletProvider";

import ProfileTab from "../DashboardContent/DashboardNavbar/ProfileTab";
import Spinner from "../Spinner";
import defaultImg from "../..//assets/img/misc/dollar-temp.png";

const Navbar = () => {
  const { smartAccountAddress } = useWalletProvider();
  const { isConnecting, isReconnecting, isConnected, isDisconnected } =
    useAccount();
  const { connect, connectors } = useConnect();
  const [profileTabOpen, setprofileTabOpen] = useState(false);

  return (
    <>
      <nav className="navbar--container aic">
        <div className="navbar-brand-box aic">
          <Link to="/">
            <Image src={logo} className={"navbar-brand-logo anim "} />
          </Link>
        </div>
        {isConnected && (
          <div className="navbar-links aic">YOU ARE LOGGED IN PERFECTLY</div>
        )}

        <div className="navbar-btns aic">
          {isConnected ? (
            !!smartAccountAddress ? (
              <Image
                src={defaultImg}
                onClick={() => setprofileTabOpen((prev) => !prev)}
                className={`DashboardNavbar-avatar hover anim ${
                  !!profileTabOpen ? "DashboardNavbar-avatar-open" : ""
                }`}
                data-tooltip-id="tooltip"
                data-tooltip-content="Menu de Usuario"
              />
            ) : (
              <Spinner />
            )
          ) : (
            <>
              <Button
                type="button"
                disabled={isConnecting}
                onClick={() => connect({ connector: connectors[0] })}
              >
                {isConnecting && "Conectando..."}
                {isReconnecting && "Reconectando..."}
                {isDisconnected && "Crea tu wallet/Ingresa"}
              </Button>
              <Button
                disabled={isConnecting}
                className="navbar-metamask-btn"
                type="button"
                onClick={() => connect({ connector: connectors[1] })}
                icon_right={isDisconnected ? "metamask" : false}
              >
                {isConnecting && <Spinner />}
                {isReconnecting && "Reconectando..."}
              </Button>
            </>
          )}
        </div>
      </nav>
      {!!isConnected && (
        <ProfileTab
          alt
          visible={profileTabOpen}
          close={() => setprofileTabOpen(() => false)}
        />
      )}
    </>
  );
};

export default memo(Navbar);
