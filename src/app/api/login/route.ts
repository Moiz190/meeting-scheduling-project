import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import { Users } from "@/models/user";

export async function POST(request: Request, response: NextApiResponse) {
  try {
    const { name, password } = await request.json();
    const myUser = await Users.findOne({
      where: {
        name: name,
        password: password,
      },
    });

    if (!myUser) {
      return NextResponse.json({
        code: 400,
        message: "User with given email and password not found",
      });
    }

    return NextResponse.json({
      data: myUser.dataValues,
      message: "Success",
      code: 200,
    });
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      code: 500,
      message: "Unexpected Server error",
    });
  }
}
