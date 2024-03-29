"use server"

import { createTransport } from "nodemailer"
import jwt from 'jsonwebtoken';
import { google } from 'googleapis';
import { SignupRequest, LoginRequest } from "@/emails/auth";
import { render } from "@react-email/render";
import { GetUser, UserType } from "./database/users";
import { WelcomeEmail } from "@/emails/welcome";

const getAuthToken = (email: string, authType: string) => {
  const payload = { "email": email, "authType": authType };
  const authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30m" });
  return authToken
}

export const GetSessionToken = async (email: string) => {
  const payload = { "email": email }
  const sessionToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" })
  return sessionToken
}

export const VerifyToken = async (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

export const SendAuthLink = async (email: string, authType: string) => {
  const login = authType === "login";
  var transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });


  var username = "";
  if (login) {
    const user = await GetUser(email);
    username = user?.name!;
  }

  const GetEmail = login ? LoginRequest : SignupRequest;

  var mailOptions = {
    from: `ALLCAPZ <${process.env.NODEMAILER_EMAIL}>`,
    to: email,
    subject: `${login ? "Log into" : "Sign upto"} ALLCAPZ.in`,
    html: render(GetEmail(login ? username : email, `${process.env.AUTH_URL}?authToken=${getAuthToken(email, authType)}`))
  };

  try {
    transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}


export const SendWelcome = async (name: string, email: string) => {
  var transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });


  var mailOptions = {
    from: `ALLCAPZ <${process.env.NODEMAILER_EMAIL}>`,
    to: email,
    subject: `Welcome to ALLCAPZ.in`,
    html: render(WelcomeEmail(name))
  };

  try {
    transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}



const getOathClient = () => {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.AUTH_URL + 'google'
  );
}


export const GetGoogleAuthLink = async () => {
  const oauth2Client = getOathClient();

  const scopes = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'];
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });
}


export const GetGoogleUser = async (code: string) => {
  const oauth2Client = getOathClient();
  
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  
  const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
  const { data } = await oauth2.userinfo.get();
  
  return {name: data.given_name, email: data.email} as UserType;
};