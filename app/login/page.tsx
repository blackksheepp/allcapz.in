"use client";
import React, { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [expired, setExpired] = useState(false);
  const [verified, setVerified] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  const oauthGoogle = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const emailLink = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    setCheckEmail(true);

    try {
      const { startEmailLinkFlow, cancelEmailLinkFlow } =
        signIn.createEmailLinkFlow();

      const si = await signIn.create({
        identifier: email,
      });
      const e = await si.supportedFirstFactors.find(
        (ff) => ff.strategy === "email_link" && ff.safeIdentifier === email
      );

      if (e?.strategy === "email_link") {
        const result = await startEmailLinkFlow({
          emailAddressId: e.emailAddressId,
          redirectUrl: "http://localhost:3000/verify",
        });

        const verify = result.firstFactorVerification;
        if (verify.verifiedFromTheSameClient()) {
          setVerified(true);
          return;
        } else if (verify.status === "expired") {
          setExpired(true);
        }
        if (result.status === "complete") {
          setActive({
            session: result.createdSessionId,
            beforeEmit: () => router.push("/"),
          });
          router.push("/");
          return;
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (expired) {
    return <div>Magic link has expired</div>;
  }

  if (verified) {
    return <div>Signed in on other tab</div>;
  }

  return (
    <div className="w-full h-screen grid place-items-center font-ibm">
      <div className="box-shadow w-[600px] h-[400px] border-accent border-[4px] flex items-start">
        <div className="w-full h-full flex flex-col">
          <div className="bg-accent h-[24px] w-full flex items-center px-2 py-2">
            <div className="w-full flex flex-row gap-2 items-start justify-start text-sm text-black font-bold">
              <p>Login</p>
              <Link href="/register">
                <p className="text-[12px] cursor-pointer opacity-60">
                  (Click here to Register)
                </p>
              </Link>
            </div>
            <div className="flex flex-row gap-1 w-full h-full items-center justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="rgba(0,0,0,1)"
              >
                <path d="M5 11V13H19V11H5Z"></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 22"
                width="22"
                height="22"
                fill="rgba(0,0,0,1)"
              >
                <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
              </svg>
            </div>
          </div>
          <div className="w-full h-full bg-black opacity-90"></div>
          <div className="w-[600px] absolute mt-6 flex flex-col gap-2 text-[13px] font text-green-400">
            <p className="mt-1 ml-3 text-[12px] ">
              RchnaKaar [Version 1.0]
              <br />
              (c) Rchna Corporation. All rights reserved.
            </p>

            {!checkEmail ? (
              <form className="ml-3 flex flex-col gap-2 mt-7">
                <button
                  onClick={oauthGoogle}
                  className="flex flex-row items-center gap-2"
                >
                  <p className="italic">&gt;_ Sign In with Google OR</p>
                </button>
                <div className="flex flex-row items-center gap-2">
                  <label htmlFor="emailAddress" className="">
                    &gt;_ Enter your email:
                  </label>
                  <input
                    type="email"
                    name="emailAddress"
                    id="emailAddress"
                    onChange={(e) => setEmail(e.target.value)}
                    className="outline-none bg-transparent text-accent w-[300px]"
                    placeholder="johndoe@email.com"
                    required={true}
                  />
                </div>
                <div className="flex flex-row items-center gap-2">
                  <button
                    onClick={emailLink}
                    className="outline-none bg-transparent text-green-400 cursor-pointer"
                  >
                    &gt;_ Click Here to Login
                  </button>
                </div>
              </form>
            ) : (
              <div className="w-full flex items-center justify-center mt-10 text-[18px]">
                <p className="text-center">
                  Check your email App
                  <br />
                  We&apos;ve sent you a login url at
                  <br />
                  {email}
                </p>
              </div>
            )}

            <div className="w-full h-full mt-10 grid place-items-center">
              <code>
                <span className="ascii text-green-500 logo">
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <br />
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>,</span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>(</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <br />
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <br />
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>#</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span>/</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <br />
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <br />
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <br />
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>#</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <br />
                  <span> </span>
                  <span> </span>
                  <span>/</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <br />
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span>.</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <br />
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <span>&</span>
                  <br />
                </span>
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
