import { z } from "zod";

import { compare } from "bcryptjs";

import { router, publicProcedure } from "../trpc";
import { generateUserToken } from "../../../utils/generateToken";

export const userRouter = router({
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { email: input.email },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const passwordValid = await compare(input.password, user.password);

      if (!passwordValid) {
        throw new Error("Invalid password");
      }

      const token = generateUserToken(user.id);

      return {
        user: {
          ...user,
          password: undefined,
        },
        token,
      };
    }),
  create: publicProcedure
    .input(
      z
        .object({
          name: z.string(),
          email: z.string().email(),
          password: z.string(),
          confirmPassword: z.string(),
          birthday: z.date(),
          phone: z.string(),
          gender: z.string(),
        })
        .superRefine(({ confirmPassword, password }, ctx) => {
          if (password !== confirmPassword) {
            ctx.addIssue({ code: "custom", message: "Passwords do not match" });
          }
        })
    )
    .mutation(async ({ ctx, input }) => {
      const userAlreadyExists = await ctx.prisma.user.findFirst({
        where: { email: input.email },
      });

      if (userAlreadyExists) {
        throw new Error("User already exists");
      }

      const user = await ctx.prisma.user.create({
        data: {
          ...input,
          role: {
            connectOrCreate: {
              where: { name: "ADMIN" },
              create: { name: "ADMIN" },
            },
          },
        },
      });

      const token = generateUserToken(user.id);

      return {
        user: {
          ...user,
          password: undefined,
        },
        token,
      };
    }),
});
