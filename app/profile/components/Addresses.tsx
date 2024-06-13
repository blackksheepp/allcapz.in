import { useSession } from '@/app/providers/Session';
import { AddressType, DeleteAddress, GetAddresses, UpdateAddress } from '@/app/utils/database/addresses';
import React, { useCallback, useEffect, useState } from 'react'
import { Field, FormError } from '@/app/checkout/components/Field';
import { z } from "zod";

const Addresses = () => {
    const { session } = useSession();

    const [addresses, setAddresses] = useState<AddressType[] | null>(null);
    const refresh = () => {
        if (session) {
            GetAddresses(session?.email).then((addresses) => {
                if (addresses) setAddresses(addresses)
            })
        }
    }
    useEffect(() => {
        refresh()
    }, [])

    const [edit, setEdit] = useState<boolean>(false);


    const [addressId, setAddressId] = useState<string>("")
    const [fname, setFname] = useState<string>("")
    const [lname, setLname] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [street, setStreet] = useState<string>("")
    const [postalCode, setPostalCode] = useState<string>("")
    const [city, setCity] = useState<string>("")
    const [phone, setPhone] = useState<string>("")

    const [formErrors, setFormErrors] = useState<FormError[]>();
    
    const editAddress = (address: AddressType) => {
        setAddressId(address.id!);
        setFname(address.fname);
        setLname(address.lname);
        setStreet(address.street);
        setAddress(address.address);
        setPostalCode(address.postalCode);
        setCity(address.city);
        setPhone(address.phone);
        setEdit(true);
    }

    const onSubmit = useCallback(async () => {
        const summaryValidate = z.object({
            fname: z.string().min(2, { message: "First name is required" }),
            lname: z.string().min(2, { message: "Last name is required" }),
            street: z.string().min(10, { message: "Street is required" }),
            address: z.string().min(10, { message: "Address is required" }),
            postalCode: z.string().regex(/^\d{6}$/g, { message: "Enter a valid postal code" }),
            city: z.string().min(2, { message: "City is required" }),
            phone: z.string().regex(/^\d{10}$/g, { message: "Enter a valid phone number" }),
        });

        const summaryResponse = summaryValidate.safeParse({ fname, lname, street, address, postalCode, city, phone })
        if (!summaryResponse.success) {
            const errors = summaryResponse.error.errors.map(
                (e: any) => {
                    return { for: e.path[0], message: e.message } as FormError
                }
            )
            setFormErrors(errors)
            return
        }

        setEdit(false);
        UpdateAddress({
            id: addressId,
            email: session?.email!,
            fname,
            lname,
            street,
            address,
            city,
            postalCode,
            phone
        }).then(() => refresh());
    }, [session?.email, addressId, fname, lname, street, address, postalCode, city, phone])


    return (
        <div className="w-full px-vw-24 py-3">
            <div className="flex flex-col">
                <p className="text-lgTo2xl font-retro text-accent">Manage, Add</p>
                <p className="text-xsTosm font-ibm text-accent">Or Remove Addresses</p>
            </div>
            <div className="w-full min-h-[600px] min-h-100 border-[3px] mt-3 border-dashed border-[#c4c4c4] py-14 px-vw-20">
                {edit ? (<div className="w-full h-full grid place-items-center">
                    <div className="w-full flex flex-col gap-7 max-w-[650px] font-ibm">
                        <div className="w-full flex lg:flex-row md:flex-row flex-col lg:gap-4 md:gap-4 gap-10">
                            <Field value={fname} name="fname" placeholder="First Name" onChange={setFname} formErrors={formErrors} setFormErrors={setFormErrors} />
                            <Field value={lname} name="lname" placeholder="Last Name" onChange={setLname} formErrors={formErrors} setFormErrors={setFormErrors} />
                        </div>
                        <Field value={street} onChange={setStreet} name="street" placeholder="Apartment, Landmark, Street" formErrors={formErrors} setFormErrors={setFormErrors} />
                        <Field value={address} onChange={setAddress} name="address" placeholder="Address" formErrors={formErrors} setFormErrors={setFormErrors} />
                        <div className="w-full flex lg:flex-row md:flex-row flex-col lg:gap-4 md:gap-4 gap-10">
                            <Field value={postalCode} onChange={setPostalCode} name="postalCode" placeholder="Postal Code" formErrors={formErrors} setFormErrors={setFormErrors} />
                            <Field value={city} onChange={setCity} name="city" placeholder="City" formErrors={formErrors} setFormErrors={setFormErrors} />
                        </div>
                        <Field value={phone} onChange={setPhone} name="phone" placeholder="Phone No." formErrors={formErrors} setFormErrors={setFormErrors} />
                        <p onClick={onSubmit} className="bg-accent w-full text-center py-2 font-[500] text-background" >Save Address</p>
                    </div>
                </div>) : (
                    <>
                        {addresses?.flatMap((address: AddressType, index) => {
                            return (
                                <div key={index}>
                                    {index === 0 && <div className="w-full h-[1px] bg-[#a4a4a4]"></div>}
                                    <div className="w-full flex flex-row justify-between items-center cursor-pointer text-accent text-smTolg font-ibm">
                                        <div className="flex flex-col gap-1 p-4">
                                            <p className="font-bold">{address?.fname} {address?.lname}</p>
                                            <p className="">{address?.street}</p>
                                            <p className="">{address?.address}</p>
                                            <p className="">{address?.postalCode}, {address?.city}</p>
                                            <p className="">India</p>
                                            <p className="">+91 {address?.phone}</p>
                                        </div>
                                        <div className="flex flex-col gap-vw-2">
                                            <p onClick={() => editAddress(address)} className="px-5 py-0.5 text-background text-center font-[500] bg-accent dropshadow text-smToLg active:-mb-1 active:-mr-1">
                                                Edit
                                            </p>
                                            <p onClick={() => DeleteAddress(address.id!).then(() => refresh())} className="px-5 py-0.5 text-accent text-center font-[500] bg-red-700 dropshadow text-smToLg active:-mb-1 active:-mr-1">
                                                Delete
                                            </p>
                                        </div>
                                    </div>
                                    {index !== addresses.length && <div className="w-full h-[1px] bg-[#a4a4a4]"></div>}
                                </div>
                            )
                        })}</>
                )}

            </div>
        </div>
    )
}

export default Addresses