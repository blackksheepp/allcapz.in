"use server"

import { createTransport } from "nodemailer"
import jwt from 'jsonwebtoken';
import { google } from 'googleapis';
import { AuthEmail, OrderConfirmEmail } from "@/emails/auth";
import { render } from "@react-email/render";
import { GetUser, UserType } from "./database/users";
import Mail from "nodemailer/lib/mailer";

const getAuthToken = (email: string, authType: string) => {
  const payload = { "email": email, "authType": authType };
  const authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10m" });
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

export const SendAuthLink = async (email: string, authType: string, checkout: boolean) => {
  const login = authType === "login";

  var transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    secure: true,
  });

  var authLink: string = `${process.env.AUTH_URL}?authToken=${getAuthToken(email, authType)}`;
  if (checkout) {
    authLink = `${process.env.AUTH_URL}checkout?authToken=${getAuthToken(email, authType)}&path=/`;
  }

  var mailOptions: Mail.Options = {
    from: `ALLCAPZ <${process.env.SMTP_USERNAME}>`,
    to: email,
    subject: `${login ? "Log into" : "Sign upto"} ALLCAPZ.IN`,
    html: render(AuthEmail(authType, authLink)),
    list: {
      unsubscribe: {
        url: `https://allcapz.in/unsubscribe/${email}`,
        comment: 'Unsubscribe',
      },
      subscribe: {
        url: `https://allcapz.in/subscribe/${email}`,
        comment: 'Subscribe',
      },
    },
    attachments: [
      {
        filename: "bg.png",  
        path: "./emails/bg.png",
        contentDisposition: "inline",
        cid: "bg.png",
        contentType: "image/png",
      },
      {
        filename: "logo.png",
        path: "./emails/logo.png",
        contentDisposition: "inline",
        cid: "logo.png",
        contentType: "image/png",
      },
      {
        filename: `${login ? "login.png" : "signup.png"}`,
        path: `./emails/${login ? "login.png" : "signup.png"}`,
        contentDisposition: "inline",
        cid: `${login ? "login.png" : "signup.png"}`,
        contentType: "image/png",
      },
    ]
  };

  try {
    transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log(error, "FAILED EMAIL");
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

  return { name: data.given_name, email: data.email } as UserType;
};

export interface RedirectUri {
  type: string;
  uri: string;
  auth: boolean;
  user?: string;
}

export const SendOrderConfirmation = async (name: string, email: string, order_id: string) => {
  var transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    secure: true,
  });

  const data: RedirectUri = {
    type: "order",
    uri: `profile?order=${order_id}`,
    auth: true,
    user: email
  } 


  const orderUrl = process.env.AUTH_URL + "?redirect=" + btoa(JSON.stringify(data));
  
  var mailOptions = {
    from: `ALLCAPZ <${process.env.SMTP_USERNAME}>`,
    to: email,
    subject: `Thanks for shopping with ALLCAPZ.IN!`,
    html: render(OrderConfirmEmail(name, orderUrl))
  };

  try {
    transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log(error, "FAILED EMAIL");
    return false;
  }
}

