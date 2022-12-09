import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { AuthProvider } from "../contexts/AuthContex";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />;
    </AuthProvider>
  );
};

export default trpc.withTRPC(MyApp);
