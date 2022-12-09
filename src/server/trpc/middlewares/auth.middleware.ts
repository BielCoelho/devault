import { trpcMiddleware } from "../trpc";

export const isAuth = trpcMiddleware((test) => {
  // TO-DO: Implement auth middleware
  console.log(test);
  return test.next();
});
