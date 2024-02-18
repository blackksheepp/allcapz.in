"use client";
import React, { useEffect, useState } from "react";
import { EmailLinkErrorCode, isEmailLinkError, useClerk } from "@clerk/nextjs";

const Verify = () => {
  const [verificationStatus, setVerificationStatus] = React.useState("loading");
  const { handleEmailLinkVerification } = useClerk();

  useEffect(() => {
    (async () => {
      try {
        await handleEmailLinkVerification({
          redirectUrl: "/",
          redirectUrlComplete: "/",
        });

        setVerificationStatus("verified");
      } catch (err: any) {
        let status = "failed";
        if (isEmailLinkError(err) && err.code === EmailLinkErrorCode.Expired) {
          status = "expired";
        }
        setVerificationStatus(status);
      }
    })();
  }, []);

  if (verificationStatus === "loading") {
    return <div className="text-accent">Loading...</div>;
  } else if (verificationStatus === "failed") {
    return <div className="text-accent">Magic link verification failed</div>;
  } else if (verificationStatus === "expired") {
    return <div className="text-accent">Magic link expired</div>;
  } 
  
  else {
    return (
      <div className="text-accent">Successfully signed in. Return to the original tab to continue.</div>
    );
  }
  
};

export default Verify;
