import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "@rainbow-me/rainbowkit/styles.css";
import {
  ConnectButton,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { http, WagmiProvider } from "wagmi";

import { mainnet, sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  zerionWallet,
} from "@rainbow-me/rainbowkit/wallets";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const queryClient = new QueryClient();

export default function App() {
  const config = getDefaultConfig({
    ssr: true,
    appName: "RainbowKit Remix Example",
    projectId: "YOUR PROJECT ID",
    chains: [sepolia, mainnet],
    wallets: [
      {
        groupName: "Recommended",
        wallets: [rainbowWallet, zerionWallet, metaMaskWallet, injectedWallet],
      },
    ],
    transports: {
      [sepolia.id]: http(),
    },
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "12px",
            }}
          >
            <ConnectButton />
          </div>
        </RainbowKitProvider>
        <Outlet />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
