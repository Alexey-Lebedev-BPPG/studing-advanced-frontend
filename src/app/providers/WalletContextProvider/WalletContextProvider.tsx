// для соланы
// import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
// import {
//   ConnectionProvider,
//   WalletProvider,
// } from '@solana/wallet-adapter-react';
// import { WalletModalProvider as ReactUIWalletModalProvider } from '@solana/wallet-adapter-react-ui';
// import {
//   PhantomWalletAdapter,
//   SolletWalletAdapter,
//   BraveWalletAdapter,
// } from '@solana/wallet-adapter-wallets';
// import { clusterApiUrl } from '@solana/web3.js';
// import { FC, ReactNode, useCallback, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getRouteWelcome } from '@/shared/const/route';

// export const WalletContextProvider: FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const navigate = useNavigate();
//   const currentNetwork = environment.NETWORK;
//   const network =
//     currentNetwork === 'devnet'
//       ? { walletAdapterSolana: WalletAdapterNetwork.Devnet }
//       : { walletAdapterSolana: WalletAdapterNetwork.Mainnet };
//   const endpoint = useMemo(
//     () => clusterApiUrl(network.walletAdapterSolana),
//     [network.walletAdapterSolana],
//   );

//   const wallets = useMemo(
//     () => [
//       new BraveWalletAdapter(),
//       new PhantomWalletAdapter(),
//       new SolletWalletAdapter(),
//     ],
//     [],
//   );
//   const onError = useCallback(
//     async (error: WalletError) => {
//       try {
//         if (error.name === 'WalletDisconnectedError')
//           console.log('WalletDisconnectedError', error);
//         if (error.message === 'User rejected the request.')
//           navigate(getRouteWelcome());
//       } catch (err) {
//         console.log('WalletContextProvider', error);
//       }
//     },
//     [navigate],
//   );

//   return (
//     <ConnectionProvider endpoint={endpoint}>
//       <WalletProvider autoConnect wallets={wallets} onError={onError}>
//         <ReactUIWalletModalProvider>{children}</ReactUIWalletModalProvider>
//       </WalletProvider>
//     </ConnectionProvider>
//   );
// };
