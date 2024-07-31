import { createContext, useContext } from "react";
import usePimlico from "../hooks/usePimlico";
export const WalletProviderContext = createContext();
export const WalletProviderProvider = ({ children }) => {
  const { smartAccountAddress, isLoadingSafeWallet, getSmartAccountClient } =
    usePimlico();
  return (
    <WalletProviderContext.Provider
      value={{
        smartAccountAddress,
        isLoadingSafeWallet,
        getSmartAccountClient,
      }}
    >
      {children}
    </WalletProviderContext.Provider>
  );
};

// Hook
export const useWalletProvider = () => useContext(WalletProviderContext);
