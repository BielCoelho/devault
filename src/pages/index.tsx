import { type NextPage } from "next";

import { Login } from "./Login";
import { Button, ButtonVariant } from "../components/Button";

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

export default Home;
