import { Suspense, lazy } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Spinner from "./components/Spinner";
import { createConfig, WagmiProvider } from "wagmi";
import { http } from "viem";
import { WalletProviderProvider } from ".//context/WalletProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { polygon } from "wagmi/chains";
import { dedicatedWalletConnector } from "@magiclabs/wagmi-connector";
import { injected } from "wagmi/connectors";

const Home = lazy(() => import("./pages/Home"));
const queryClient = new QueryClient();

const config = createConfig({
  chains: [polygon],
  transports: {
    [polygon.id]: http(process.env.REACT_APP_RPC_URL),
  },
  autoConnect: true,
  connectors: [
    dedicatedWalletConnector({
      chains: [polygon],
      options: {
        apiKey: process.env.REACT_APP_MAGIC_API_KEY,
        isDarkMode: false,
        oauthOptions: {
          providers: ["google", "github", "discord", "linkedin", "twitter"],
          callbackUrl: "https://r2rdefi.com/",
        },
        magicSdkConfiguration: {
          network: {
            rpcUrl: process.env.REACT_APP_RPC_URL,
            chainId: polygon.id,
          },
        },
      },
    }),
    injected(),
  ],
});

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Spinner full />}>
          <WalletProviderProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Navigate to={"/"} />} />
              </Routes>
            </BrowserRouter>
          </WalletProviderProvider>
        </Suspense>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
