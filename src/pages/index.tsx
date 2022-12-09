import { type NextPage } from "next";

import { Button, ButtonVariant } from "../components/Button";
import { Login } from "./Login";

const Home: NextPage = () => {
  // const hello = trpc.user.createUser;

  // console.log(hello);
  return (
    <>
      <Login />
      <Button variant={ButtonVariant.SECONDARY}>Teste</Button>
    </>
  );
};

Home.displayName = "HomePage";
export default Home;
