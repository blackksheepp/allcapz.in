"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { LoginTransition } from "@/layouts/LoginTransition";
import { useSession } from "@/app/Providers/Session";
import { GetUser } from "@/app/utils/database/users";
import { GetGoogleAuthLink } from "@/app/utils/auth";
import { useRouter } from "next/navigation";
import { useLoginStore } from "@/app/utils/store/loginStore";

const Minimize = ({
    onClick,
}: {
    onClick: React.MouseEventHandler;
}) => {
    return (
        <svg
            onClick={onClick}
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="rgba(0,0,0,1)"
        >
            <path d="M5 11V13H19V11H5Z"></path>
        </svg>
    )

}

const Close = ({
    onClick,
}: {
    onClick: React.MouseEventHandler;
}) => {
    return (
        <svg
            onClick={onClick}
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22 22"
            width="22"
            height="22"
            fill="rgba(0,0,0,1)"
        >
            <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
        </svg>
    )

}

const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const Auth = () => {
    const [mobile, setMobile] = useState(false);
    const [width, setWidth] = useState(0);
    const [authType, setAuthType] = useState<"login" | "sign up">("sign up");
    const toggleAuth = () => {
        setAuthType(authType == "login" ? "sign up" : "login")
    }

    const [email, setEmail] = useState<string>("");
    const [emailSent, setEmailSent] = useState<string>("");

    const { session, authenticate, logout } = useSession();

    const { showLogin, setLogin } = useLoginStore((state) => state);
    
    const close = (e: React.MouseEvent) => {
        setEmail("")
        setLogin(false);
    }
    const [emailError, setEmailError] = useState<string>("");
    const validateEmail = async (email: string) => {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (regex.test(email)) {
            const user = await GetUser(email);
            if (authType === "login") {
                if (user) return true;
                else setEmailError("No user found with this email.");
            } else {
                if (!user) return true;
                else setEmailError("User already exists with this email.");
            }
        } else setEmailError("Please enter a real email.");
    };

    const [sendEmail, setSendEmail] = useState<boolean>(false);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (await validateEmail(email)) {
            setEmailSent(`Check your email App
                        \n
                        We've sent you a ${authType} url at
                        \n
                        ${email}`);
            setSendEmail(true);
        }
    }

    const router = useRouter()
    const GoogleAuth = async () => {
        setEmailSent(`We're redirecting you to google ${authType}.`);
        const link = await GetGoogleAuthLink();
        router.push(link);
    }

    useEffect(() => {
        (async () => {
            if (emailSent && sendEmail) {
                const res = await authenticate({
                    email: email,
                    authType: authType
                });
                setSendEmail(!res);
            }
        })()

        setMobile(window.innerWidth < 640);
        setWidth(window.innerWidth)

        if (showLogin) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden")
        };


    }, [showLogin, mobile, emailSent, authType, email, authenticate, sendEmail, width]);

    return (
        <LoginTransition animate={showLogin} mobile={mobile}>
            <div className="w-full h-screen grid place-items-center font-ibm">
                <div style={{ width: width - 30, maxWidth: 600 }} className={`box-shadow h-[400px] border-accent lg:border-[4px] md:border-[4px] border-[2px] flex items-start`}>
                    <div className="w-full h-full flex flex-col ">
                        <div className="bg-accent h-[24px] w-full flex flex-row justify-between items-center px-2 py-2">
                            <div className="flex flex-row gap-2 items-start justify-start text-sm text-black font-bold">
                                <p>{capitalize(authType)}</p>
                                <p className="text-[12px] cursor-pointer opacity-60" onClick={toggleAuth}>
                                    (Click here to {authType == "login" ? "Sign Up" : "Login"})
                                </p>
                            </div>
                            <div className="flex flex-row gap-1 h-full items-center justify-end">
                                <Minimize onClick={close} />
                                <Close onClick={close} />
                            </div>
                        </div>
                        <div className="w-full h-full bg-black opacity-95"></div>
                        <div style={{ width: width - 30, maxWidth: 600 }} className="absolute mt-6 flex flex-col gap-2 text-[13px] font text-green-400">
                            <p className="mt-2 ml-3 text-[13px]">
                                ALLCAPZ [Version 1.0]
                                <br />
                                (c) AllCapz Corp. All rights reserved.
                            </p>

                            {!emailSent ? (
                                <form onSubmit={handleSubmit} className="self-center flex flex-col items-center justify-center gap-2 mt-10">
                                    <button
                                        onClick={() => GoogleAuth()}
                                        className="border-[1px] border-green-400 hover:bg-green-500 hover:text-black hover:font-bold transition-all duration-200 ease-in-out w-[230px] py-1.5 text-[13px]"
                                    >
                                        {capitalize(authType)} with Google
                                    </button>
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="outline-none bg-transparent text-accent w-[230px] py-2 text-center text-[13px]"
                                        placeholder="enter your email here"
                                        required={true}
                                    />
                                    <input
                                        className="border-[1px] border-green-400 bg-green-500 hover:bg-black hover text-black hover:text-green-500 hover:font-bold w-[230px] py-1.5 text-[13px] transition-all duration-200 ease-in-out"
                                        type="submit"
                                        value={capitalize(authType)}
                                    />
                                    <p>{emailError.toUpperCase()}</p>

                                </form>
                            ) : (
                                <div className="w-full flex items-center justify-center mt-10 text-[18px]">
                                    <p className="text-center">
                                        {emailSent}
                                    </p>
                                </div>
                            )}
                            <div className="w-full h-full mt-4 grid place-items-center">
                                {/* <code>
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
                                </code> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LoginTransition>
    );
};

export default Auth;
