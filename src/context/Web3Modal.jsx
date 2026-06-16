"use client";

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "c66e1435565404f878eb8e0ade9138b1"; // Fallback to avoid crashes

const bscMainnet = {
  chainId: 56,
  name: 'BNB Smart Chain',
  currency: 'BNB',
  explorerUrl: 'https://bscscan.com',
  rpcUrl: 'https://bsc-dataseed.binance.org/'
};

const metadata = {
  name: 'Elyxnet',
  description: 'Decentralized AI Infrastructure',
  url: 'https://elyxnet.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const ethersConfig = defaultConfig({
  metadata,
  enableEIP6963: true,
  enableInjected: true,
  enableCoinbase: true,
  rpcUrl: 'https://bsc-dataseed.binance.org/',
  defaultChainId: 56,
});

createWeb3Modal({
  ethersConfig,
  chains: [bscMainnet],
  projectId,
  enableAnalytics: false,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-color-mix': '#eab308',
    '--w3m-color-mix-strength': 10,
    '--w3m-accent': '#eab308',
  }
});

export function Web3ModalProvider({ children }) {
  return children;
}
