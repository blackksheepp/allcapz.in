"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { UserType } from '../utils/database/users';
import { SendAuthLink, VerifyToken, GetSessionToken } from '../utils/auth';
import { FitTexture } from '../components/TextureOverlay';
import { CreateUser, GetUser } from '../utils/database/users';
import { ClearSessionCookie, GetSessionCookie, SetSessionCookie } from '../utils/cookies/auth';

interface auth {
    email: string,
    authType: "login" | "sign up",
    iat?: number,
    exp?: number
}

interface SessionContextType {
    session: UserType | null;
    authenticate: ({ email, authType }: auth) => Promise<boolean>;
    logout: () => void;
    authGoogle: (user: UserType, path: string) => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface SessionProviderProps {
    children: React.ReactNode
}


export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
    const [session, setSession] = useState<UserType | null>(null);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [askName, setAskName] = useState<boolean>(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        (async () => {
            const authToken = searchParams.get('authToken');
            if (authToken) {
                try {
                    const payload = await VerifyToken(authToken) as auth;
                    if (payload.authType === "sign up") {
                        setEmail(payload.email)
                        setAskName(true);
                    } else {
                        const user = await GetUser(payload.email);
                        const sessionToken = await GetSessionToken(payload.email);
                        if (await SetSessionCookie(sessionToken)) router.replace("/");
                    }
                } catch (error) {
                    console.error('Invalid token:', error);
                }
            } else {
                const sessionToken = await GetSessionCookie();
                if (sessionToken) {
                    try {
                        const payload = await VerifyToken(sessionToken) as auth;
                        const user = await GetUser(payload.email);
                        setSession(user);
                    } catch (error) {
                        console.error('Invalid auth token from cookie:', error);
                        await ClearSessionCookie();
                    }
                }
            }
        })()
    }, [searchParams, router]);

    const authenticate = async ({ email, authType }: auth) => {
        const sendEmail = await SendAuthLink(email, authType);
        return sendEmail;
    }

    const authGoogle = async (user: UserType, path: string) => {
        const checkUser = await GetUser(user.email);
        if (!checkUser) {
            const success = await CreateUser(user);
            const sessionToken = await GetSessionToken(user.email);
            if (await SetSessionCookie(sessionToken)) router.replace(path);
        } else {
            const sessionToken = await GetSessionToken(user.email);
            if (await SetSessionCookie(sessionToken)) router.replace(path);
        }
    }

    const logout = async () => {
        setSession(null)
        await ClearSessionCookie()
        router.replace("/")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setAskName(false);

        const user: UserType = {
            name,
            email
        };

        await CreateUser(user);
        const sessionToken = await GetSessionToken(email);
        if (await SetSessionCookie(sessionToken)) router.replace("/");
    }

    return (
        <SessionContext.Provider value={{ session, authenticate, logout, authGoogle }}>
            {askName && <div className="absolute z-40 w-full h-full grid place-items-center">
                <div className="absolute w-[300px] mt-10 bg-black border-[1px] border-green-500">
                    <FitTexture />
                    <form onSubmit={handleSubmit} className='w-full flex flex-col items-center justify-center gap-5 py-7'>
                        <input
                            type="text"
                            className="text-accent font-retro bg-transparent outline-none text-center"
                            placeholder="What should we call you?"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className="hover:border-[1px] border-green-400 bg-green-500 hover:bg-black hover text-black hover:text-green-500 hover:font-bold w-[150px] py-1.5 text-[13px] transition-all duration-200 ease-in-out font-bold font-ibm"
                            type="submit"
                            value={"Shop Now"}
                        />
                    </form>
                </div>
            </div>}
            <div className={`${askName && "blur-lg overflow-hidden"}`}>{children}</div>
        </SessionContext.Provider>
    )
};

export const useSession = () => {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
};


