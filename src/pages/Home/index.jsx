import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import "./style.css";
import { Magic } from "magic-sdk";
import { useWalletProvider } from "../..//context/WalletProvider";
import Spinner from "../../components/Spinner";
import { useState } from "react";
const Home = () => {
  const { isLoadingSafeWallet, smartAccountAddress } = useWalletProvider();
  const [isLoadingPrivateKey, setIsLoadingPrivateKey] = useState(false);
  const revealPrivateKey = async () => {
    try {
      setIsLoadingPrivateKey(() => true);
      const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);
      await magic.user.revealPrivateKey();
      setIsLoadingPrivateKey(() => false);
    } catch (e) {
      console.log(e);
      setIsLoadingPrivateKey(() => false);
    }
  };
  return (
    <div className="home-container  aic">
      <Navbar />

      {!!smartAccountAddress && (
        <Button
          box
          type="button"
          onClick={() => revealPrivateKey()}
          disabled={isLoadingPrivateKey || isLoadingSafeWallet}
        >
          {isLoadingPrivateKey || isLoadingSafeWallet ? (
            <Spinner />
          ) : (
            "reveal private key"
          )}
        </Button>
      )}
    </div>
  );
};

export default Home;
