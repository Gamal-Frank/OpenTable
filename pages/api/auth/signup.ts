import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";
const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { firstName, lastName, email, password, phone, city } = req.body;
    console.log( req.body);
    
    const errors: string[] = [];
    const validationSchema = [
      {
        valid: validator.isLength(firstName, {
          min: 1,
          max: 20,
        }),
        errorMessage: "first name is invalid",
      },
      {
        valid: validator.isLength(lastName, {
          min: 1,
          max: 20,
        }),
        errorMessage: "Last name is invalid",
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "email is invalid",
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: "phone number is invalid",
      },
      {
        valid: validator.isLength(city, {
          min: 1,
        }),
        errorMessage: "city is invalid",
      },
      {
        valid: validator.isLength(password,{
          min:1
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

    if (userWithEmail)
      return res
        .status(400)
        .json({ errorMessage: "you already have an account" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        password: hashedPassword,
        city: city,
        phone: phone,
        email: email,
      },
    });

    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({ email: user.email })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);

       setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 });

    res.status(200).json({
      firstName: user.first_name,
      lastName: user.last_name,
      password: user.password,
      phone: user.phone,
      id: user.id,
      city: user.city,
      email: user.email,
    });

  }
  return res.status(404).json("unknown endpoint");
}
