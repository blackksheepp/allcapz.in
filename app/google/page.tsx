"use client"

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { GetGoogleUser } from '../utils/auth';
import { useSession } from '../providers/Session';
export default function Google() {
    const searchParams = useSearchParams();
    const code = searchParams.get("code");
    const path = searchParams.get("state");
    const { authGoogle } = useSession();

    useEffect(() => {
        (async () => {
            if (code) {
                const user = await GetGoogleUser(code);
                await authGoogle(user, path!);
            }
        })()
    }, [code, authGoogle, path])
    
    return <></>
}