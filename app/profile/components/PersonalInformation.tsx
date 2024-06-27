import { useSession } from '@/app/providers/Session'
import { AddressType, GetAddresses } from '@/app/utils/database/addresses'
import React, { useEffect, useState } from 'react'

interface FieldProps {
    label: string
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    editable?: boolean
}

const Field: React.FC<FieldProps> = ({ label, value, setValue, editable = true }) => {
    const [edit, setEdit] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const onSave = () => {
        setValue(inputValue);
        setEdit(false);
    }
    return (
        <div className="w-[80%] py-2.5 flex flex-col gap-2">
            <p className="text-smTolg font-ibm text-accent">{label}</p>
            {edit ? (
                <div className="border-[2px] border-white rounded-sm flex flex-row items-center justify-between px-4">
                    <input
                        className="bg-transparent outline-none py-1.5 font-ibm placeholder:font-ibm placeholder:text-smTolg placeholder:text-[#a4a4a4] text-smTolg text-[#a4a4a4] flex-1"
                        placeholder={`Enter ${label}`}
                        onChange={e => setInputValue(e.target.value)}
                    />
                    {editable && <p onClick={() => setEdit(!edit)} className="cursor-pointer text-ibm text-smTolg text-[#02CD2F] ">Save</p>}
                </div>
            ) : (
                <>
                    <p className={`text-smTolg px-4 py-1.5 font-ibm text-[#a4a4a4] border-[2px] border-white rounded-sm flex flex-row items-center ${inputValue ? "justify-between" : "justify-center"}`}>{inputValue}
                        {editable && <p onClick={() => setEdit(!edit)} className="cursor-pointer text-ibm text-smTolg text-[#02CD2F] text-center">{inputValue ? "Edit" : "Enter"}</p>}
                    </p>
                </>
            )}
        </div>
    )
}

export const PersonalInformation = ({ setManageAddress }: { setManageAddress: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { session } = useSession();
    const [name, setName] = useState(session?.name || "");
    const [alterEmail, setAlterEmail] = useState(session?.alterEmail || "");
    const [phone, setPhone] = useState(session?.phone || "");
    const [alterPhone, setAlterPhone] = useState(session?.alterPhone || "");

    const [addresses, setAddresses] = useState<AddressType[] | null>(null);
    useEffect(() => {
        if (session) {
            GetAddresses(session?.email).then((addresses) => {
                if (addresses) setAddresses(addresses)
            })
        } 
    }, [session])

    return (
        <div className="w-full flex flex-col pr-vw-14 pl-vw-10 gap-3 mt-vw-32 lg:mt-0">
            <div className="flex flex-col gap-1 items-end">
                <p className="text-lgTo2xl font-retro text-accent">Edit Your</p>
                <p className="text-xsTosm font-ibm text-accent">Personal Information</p>
            </div>
            <div className="w-full h-[600px] border-[3px] border-dashed border-[#c4c4c4] flex flex-col items-center  gap-7 py-8">
                {session && (
                    <div className="w-full flex flex-col items-center justify-center">
                        <Field label="Username" value={name} setValue={setName} />
                        <Field label="Email" value={session.email} setValue={setName} editable={false} />
                        <Field label="Alternate Email" value={alterEmail} setValue={setAlterEmail} />
                        <Field label="Phone Number" value={phone} setValue={setPhone} />
                        <Field label="Alternate Phone Number" value={alterPhone} setValue={setAlterPhone} />
                    </div>
                )}
                {
                    addresses && addresses.length > 0 && <button className="btn w-[80%] py-1.5">
                        <p className="w-full font-retro text-center text-smTolg" onClick={() => setManageAddress(true)}>
                            MANAGE ADDRESSES
                        </p>
                    </button>
                }
            </div>
        </div>
    )
}

