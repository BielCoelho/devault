/* eslint-disable react/display-name */
import { type AppType } from "next/app";

import { AuthProvider } from "../contexts/AuthContex";
import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />;
    </AuthProvider>
  );
};

export default trpc.withTRPC(MyApp);
