import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { verifyPassword } from '@/app/utils/actions';
// import { verifyPassword } from '@/app/utils/actions';

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

export const WithAuth = ({ children }: { children: React.ReactNode }) => {

    const [width, setWidth] = useState(0);
    useEffect(() => {
        setWidth(window.innerWidth);
        window.addEventListener('resize', () => setWidth(window.innerWidth));
        return () => {
            window.removeEventListener('resize', () => setWidth(window.innerWidth));
        }
    })

    const [verified, setVerified] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const verify = await verifyPassword(password);
        if (verify) {
            setVerified(true);
        } else {
            setError('Incorrect Password');
            setTimeout(() => setError(''), 4000)
        }
    }

    const close = () => {}
    return verified ? children : (
        <div className="w-full h-full grid place-items-center">
            <div className="w-full h-screen grid place-items-center font-ibm">
                <div style={{ width: width - 30, maxWidth: 600 }} className={`box-shadow h-[250px] border-accent lg:border-[4px] md:border-[4px] border-[2px] flex items-start`}>
                    <div className="w-full h-full flex flex-col ">
                        <div className="bg-accent h-[24px] w-full flex flex-row justify-between items-center px-2 py-2">
                            <div className="flex flex-row gap-2 items-start justify-start text-sm text-black font-bold">
                                <p>Enter Admin Password</p>
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

                            <form onSubmit={handleSubmit} className="self-center flex flex-col items-center justify-center gap-vw-2.5-min@xl mt-8">
                                <input
                                    type="password"
                                    name="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="outline-none bg-transparent text-accent w-[230px] py-1.5 text-center text-[13px] outline-green-400 outline-1"
                                    placeholder="password"
                                    required={true}
                                />
                                <input
                                    className=" border-[1px] border-green-400 bg-green-500 hover:bg-black hover text-black hover:text-green-500 hover:font-bold w-[235px] py-1.5 text-[13px] transition-all duration-200 ease-in-out"
                                    type="submit"
                                    value={"Submit"}
                                />
                                <p>{error.toUpperCase()}</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


// const withPasswordProtection = <P extends object>(
//     WrappedComponent: React.ComponentType<P>
// ) => {
//     const ComponentWithProtection = (props: P) => {
//         const [password, setPassword] = useState('');
//         const [authenticated, setAuthenticated] = useState(false);
//         const [error, setError] = useState('');
//         const router = useRouter();

//         const handlePasswordSubmit = async (e: React.FormEvent) => {
//             e.preventDefault();
//             try {
//                 const response = await axios.post('/api/verify-password', { password });
//                 if (response.status === 200) {
//                     setAuthenticated(true);
//                 }
//             } catch (error) {
//                 setError('Incorrect password');
//             }
//         };

//         if (authenticated) {
//             return <WrappedComponent {...props} />;
//         }

//         return (
//             <div className="flex justify-center items-center h-screen bg-gray-100">
//                 <form
//                     onSubmit={handlePasswordSubmit}
//                     className="bg-white p-6 rounded shadow-md"
//                 >
//                     <h2 className="text-2xl mb-4">Enter Password</h2>
//                     {error && <p className="text-red-500 mb-4">{error}</p>}
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="Enter password"
//                         required
//                         className="w-full p-2 border rounded mb-4"
//                     />
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//                     >
//                         Submit
//                     </button>
//                 </form>
//             </div>
//         );
//     };

//     return ComponentWithProtection;
// };

// export default withPasswordProtection;
