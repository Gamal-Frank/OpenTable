import validator from "validator";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";

const prisma = new PrismaClient();

export default async function hanler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const errors: string[] = [];
    const validationSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "email is invalid",
      },

      {
        valid: validator.isLength(password, {
          min: 1,
        }),
        errorMessage: "password is not strong",
      },
    ];
    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }

      if (errors.length)
        return res.status(400).json({ errorMessage: errors[0] });
    });

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userWithEmail)
      return res
        .status(401)
        .json({ errorMessage: "email or password are invalid" });

    const isMatch = await bcrypt.compare(password, userWithEmail.password);

    if (!isMatch)
      return res
        .status(401)
        .json({ errorMessage: "email or password are invalid" });

    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({ email: userWithEmail.email })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);
    setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 });

    res.status(200).json({
      firstName: userWithEmail.first_name,
      lastName: userWithEmail.last_name,
      password: userWithEmail.password,
      phone: userWithEmail.phone,
      id: userWithEmail.id,
      city: userWithEmail.city,
      email: userWithEmail.email,
    });
  }

  return res.status(404).json("unknown endpoint");
}
