import * as trpc from "@trpc/server";
import { compare } from "bcryptjs";
import { z } from "zod";

import { generateUserToken } from "../../../utils/generateToken";
import { router, publicProcedure } from "../trpc";

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
        throw new trpc.TRPCError({
          code: "BAD_REQUEST",
          message: "User not found",
        });
      }

      const passwordValid = await compare(input.password, user.password);

      if (!passwordValid) {
        throw new trpc.TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid password",
        });
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
