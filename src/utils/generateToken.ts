import { sign, verify } from "jsonwebtoken";

export const generateUserToken = (userId: string) => {
  return sign({}, process.env.JWT_SECRET, {
    subject: userId,
    expiresIn: "1d",
  });
};

export const verifyUserToken = (token: string) => {
  try {
    const { sub: user_id } = verify(token, process.env.JWT_SECRET);
    const user = prisma?.user.findFirst({ where: { id: user_id as string } });

    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
