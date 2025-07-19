import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import DatabaseConnection from "@/lib/databaseConnection";
import UserModel from "@/Models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await DatabaseConnection();
  try {
    const { username, email, password } = await request.json();
    const existingUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    const existingUserVerifiedemail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    // checck user is already exist in db
    if (existingUserVerifiedemail) {
      // if user is exist then update the user
      // check if user is verified or not
      if (existingUserVerifiedemail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already Exist",
          },
          { status: 400 }
        );
      }
      // if user is not verified then update the user
      else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserVerifiedemail.password = hashedPassword;
        existingUserVerifiedemail.verifyCode = verifyCode;
        existingUserVerifiedemail.verifyCodeExpiry = new Date(
          Date.now() + 3600000
        );
        await existingUserVerifiedemail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const newuser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        message: [],
      });
      await newuser.save();
    }

    // send Verification email
    const emailresponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
    if (!emailresponse.success) {
      return Response.json(
        {
          success: false,
          message: emailresponse.message,
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: false,
        message: "User Registered Successfully, please Verify your email",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("User registering failed" + error);
    return Response.json({
      success: false,
      message: "Error Registering User",
      status: 500,
    });
  }
}
