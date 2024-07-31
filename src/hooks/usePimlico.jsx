import {
  ENTRYPOINT_ADDRESS_V07,
  createSmartAccountClient,
  walletClientToSmartAccountSigner,
} from "permissionless";
import { useCallback, useEffect, useMemo, useState } from "react";
import { http, createPublicClient } from "viem";
import { polygon } from "viem/chains";
import {
  createPimlicoBundlerClient,
  createPimlicoPaymasterClient,
} from "permissionless/clients/pimlico";
import { signerToSafeSmartAccount } from "permissionless/accounts";
import { useAccount, useWalletClient } from "wagmi";
import { JsonRpcProvider } from "ethers";

const usePimlico = () => {
  const { address, isConnected, chain } = useAccount();
  const [isLoadingSafeWallet, setisLoadingSafeWallet] = useState(false);
  const [smartAccountAddress, setSmartAccountAddress] = useState("");
  const { data: walletClient } = useWalletClient();

  const bundlerUrl = `https://api.pimlico.io/v2/137/rpc?apikey=${process.env.REACT_APP_PIMLICO_KEY}`;
  const publicClient = useMemo(() => {
    if (!chain) return undefined;
    return createPublicClient({
      transport: http(process.env.REACT_APP_RPC_URL),
      chain: chain,
    });
  }, [chain]);

  const bundlerClient = useMemo(() => {
    return createPimlicoBundlerClient({
      transport: http(bundlerUrl),
      entryPoint: ENTRYPOINT_ADDRESS_V07,
    });
  }, [bundlerUrl]);

  const paymasterClient = useMemo(() => {
    return createPimlicoPaymasterClient({
      transport: http(bundlerUrl),
      entryPoint: ENTRYPOINT_ADDRESS_V07,
    });
  }, [bundlerUrl]);

  const calculateFinalGas = useCallback((gas) => {
    const extraGas = gas / 2n;

    return gas + extraGas;
  }, []);

  const getSmartAccountClient = useCallback(async () => {
    //wait 3 seconds to make sure the wallet is connected
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("address", address);
    console.log("isConnected", isConnected);
    console.log("publicClient", publicClient);
    console.log("walletClient", walletClient);
    if (!address || !isConnected || !publicClient || !walletClient) return;
    const smartAccountSigner = walletClientToSmartAccountSigner(walletClient);
    const provider = new JsonRpcProvider(process.env.REACT_APP_RPC_URL);
    const isDeployed = smartAccountAddress
      ? (await provider.getCode(smartAccountAddress)) !== "0x"
      : false;
    const smartAccountSafeSigner = await signerToSafeSmartAccount(
      publicClient,
      {
        signer: smartAccountSigner,
        safeVersion: "1.4.1",
        entryPoint: ENTRYPOINT_ADDRESS_V07,
        address: isDeployed ? smartAccountAddress : undefined,
      }
    );

    return createSmartAccountClient({
      account: smartAccountSafeSigner,
      entryPoint: ENTRYPOINT_ADDRESS_V07,
      chain: polygon,
      bundlerTransport: http(bundlerUrl, {
        timeout: 60_000,
      }),
      middleware: {
        gasPrice: async () =>
          (await bundlerClient.getUserOperationGasPrice()).fast,

        // gasPrice: async () => {
        //   return {
        //     maxFeePerGas: (await bundlerClient.getUserOperationGasPrice()).fast
        //       .maxFeePerGas,
        //     maxPriorityFeePerGas: (
        //       await bundlerClient.getUserOperationGasPrice()
        //     ).fast.maxPriorityFeePerGas,
        //   };
        // },

        sponsorUserOperation: async (args) => {
          let userOperation = {
            ...args.userOperation,
            // this is a placeholder data just to make a gas simulation
            paymasterData:
              "0x025C2ef2fE205B23d136D3f175e8d3c497739deD9B00000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          };
          const gas = await bundlerClient.estimateUserOperationGas({
            userOperation,
          });

          const userOp = Object.keys(gas).reduce((acc, key) => {
            const value = gas[key];
            return {
              ...acc,
              [key]:
                typeof value === "bigint" ? calculateFinalGas(value) : value,
            };
          }, {});

          return await paymasterClient.sponsorUserOperation({
            ...args,
            userOperation: { ...args.userOperation, ...userOp },
          });
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address, publicClient, smartAccountAddress, walletClient]);
  useEffect(() => {
    (async () => {
      if (!!isLoadingSafeWallet || smartAccountAddress) return;
      setisLoadingSafeWallet(() => true);
      console.log("render !!!!!!!!!!!!!!!!!11");
      const smartAccountClient = await getSmartAccountClient();
      console.log("STOP");
      setSmartAccountAddress(smartAccountClient?.account.address);
      setisLoadingSafeWallet(() => false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSmartAccountClient, smartAccountAddress]);
  return {
    getSmartAccountClient,
    smartAccountAddress,
    isLoadingSafeWallet: !!isLoadingSafeWallet,
  };
};

export default usePimlico;
