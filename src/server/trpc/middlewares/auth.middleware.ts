import { trpcMiddleware } from "../trpc";

export const isAuth = trpcMiddleware((test) => {
  // TO-DO: Implement auth middleware
  return test.next();
});
