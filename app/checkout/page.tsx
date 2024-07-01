"use client";
import React, { useCallback, useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "../providers/Session";
import { ProductType } from "../utils/database/collections";
import { CartType, ClearCart, GetCart } from "../utils/database/carts";
import { CartCookieType, GetCartFromCookies } from "../utils/cookies/cart";
import { useRouter, useSearchParams } from "next/navigation";
import { CreateRazorpayPayment } from "../utils/payment";
import { Product } from "@prisma/client";
import { set, z } from "zod";
import { CheckServiceAvailability, GetToken } from "../utils/shipping/shiprocket";
import { UpdateUser } from "../utils/database/users";
import { AddressType, GetAddresses, SaveAddress } from "../utils/database/addresses";
import { CreateOrder, PriceType } from "../utils/database/orders";
import { useLoginStore } from "../utils/store/loginStore";
import Auth from "../components/Auth";
import { Field, FormError } from "./components/Field";
import { GetImage } from "../components";
import { useCartStore } from "../utils/store/cartStore";

const CheckoutProduct = ({ product }: { product: ProductType }) => {

  return (
    <div className="w-full flex flex-row items-start justify-between py-vw-2">
      <div className="flex flex-row lg:gap-0 gap-2 items-start">
        <Image
          src={GetImage(product.id)}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-[90px] h-auto self-start ml-vw-1 shadow-lg"
        />
        <div className="flex flex-col gap-vw-0.5">
          <p className="text-background font-retro text-smTolg px-vw-2">{product.title}</p>
          <p className="text-[#424242] font-ibm font-bold text-xsTosm px-vw-2">Size: {product.size}</p>
        </div>
      </div>
      <div className="flex flex-col text-center">
        <p className="text-background font-retro text-smTolg px-vw-2">₹{product.price * (product.quantity || 1)}</p>
        <p className="text-[#424242] font-ibm font-bold text-xsTosm px-vw-2">{product.price} x {product.quantity}</p>
      </div>
    </div>
  )
}

const Next = ({ active }: { active: boolean }) => {
  return <Image
    src={GetImage(active ? "img/arrow-active.svg" : "img/arrow.svg")}
    alt="show"
    width={0}
    height={0}
    sizes="100vw"
    className="w-[20px] h-auto"
  />
}

const Prev = () => {
  return <Image
    src={GetImage("img/arrow.svg")}
    alt="show"
    width={0}
    height={0}
    sizes="100vw"
    className="w-[25px] h-auto rotate-[180deg] mt-0.5"
  />
}

const RazorPay = () => {
  return <Image
    src={GetImage("img/razorpay.svg")}
    alt="show"
    width={0}
    height={0}
    sizes="100vw"
    className="w-[150px] h-auto"
  />
}

export default function Checkout({ params }: { params: { slug: string } }) {
  const sections = ["Cart", "Summary", "Shipping", "Payment", "Review"];
  const [active, setActive] = useState<string[]>(sections.slice(0, 2));

  const [email, setEmail] = useState<string>("")
  const [fname, setFname] = useState<string>("")
  const [lname, setLname] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [street, setStreet] = useState<string>("")
  const [postalCode, setPostalCode] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const [state, setState] = useState<string>("")
  const [phone, setPhone] = useState<string>("")

  const [cart, setCart] = useState<CartType | CartCookieType | null>(null);

  const [showProducts, setShowProducts] = useState<boolean>(false);


  const { session } = useSession();
  useEffect(() => {
    (async () => {
      var getCart: CartType | CartCookieType | null = null;
      if (session) {
        getCart = await GetCart(session.email)
      } else {
        const cartCookie = await GetCartFromCookies();
        if (cartCookie) {
          getCart = JSON.parse(cartCookie)
        }
      }
      if (getCart && getCart?.products?.length > 0) setCart(getCart)
      else router.push("/")
    })()
  }, [session]);

  const { setCart: setShowCart } = useCartStore((state) => state);

  const router = useRouter();
  const search = useSearchParams();
  const previousSection = () => {
    if (active[active.length - 2] == "Cart") {
      router.push((search.get("path") || "/") + "?cart=true")
    } else {
      setActive(sections.slice(0, active.length - 1));
    }
  }

  const nextSection = () => {
    setActive(sections.slice(0, active.length + 1));

  }

  const makePayment = async () => {
    if (cart?.products) {
      const price = cart?.products.reduce((a, b) => a + (b.price * (b.quantity || 1)), 0)
      const data = await CreateRazorpayPayment(cart.products as Product[], session?.email || email, price);

      if (!data) return

      var options = {
        key: process.env.RAZORPAY_KEY,
        name: "ALLCAPZ",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: "Your Order has been comfirmed.",
        image: "https://images2.imgbox.com/cc/5f/07cbMQOO_o.png",
        handler: async function (response: any) {
          // response 
          // {
          //   "razorpay_payment_id": "pay_OIn0yBKCyg2yYZ",
          //   "razorpay_order_id": "order_OIn0pqStDPkVCc",
          //   "razorpay_signature": "06110a56e69ff29a70597dc27a54f26056eef0ed7a6513f8971be0505c8a01bf"
          // }

          // Update User
          if (!session?.phone) {
            await UpdateUser({
              name: session!.name,
              email: session!.email,
              phone: phone
            })
          }

          // Create Order
          const totalAmount = data?.amount / 100;
          const shippingCost = 0;
          const taxAmount = 0;
          const discount = 0;
          const subtotal = totalAmount + shippingCost + taxAmount - discount;
          const pricing = {
            totalAmount,
            shippingCost,
            taxAmount,
            discount,
            subtotal,
          } as PriceType

          const orderAddress = {
            email: session?.email ?? email,
            fname: fname,
            lname: lname,
            street: street,
            address: address,
            postalCode: postalCode,
            city: city,
            state: state,
            phone: phone
          }

          console.log(isNewAddress, "isNewAddress")
          if (isNewAddress) {
            SaveAddress(orderAddress)
          }
          // Create Order
          await CreateOrder({
            id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            confirmedAt: new Date(),
            status: "processing",
            user: session!.email,
            products: cart.products,
            pricing,
            address: orderAddress
          })

          // Clear Cart 
          ClearCart(session!.email)
          setShowCart(false)

          // Redirect to Order Confirmation Page
          router.push("/confirmed?id=" + response.razorpay_order_id + "&paymentId=" + response.razorpay_payment_id);




        },
        email: session?.email ?? email,
        contact: phone,
        prefill: {
          name: fname + " " + lname,
          email: session?.email ?? email,
          contact: phone,
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    }
  };

  const [formErrors, setFormErrors] = useState<FormError[]>();

  const onSubmit = useCallback(async () => {
    if (sections[active.length]) {

      if (active[active.length - 1] == "Summary") {
        const summaryValidate = z.object({
          email: z.string().email({ message: "Enter a valid email" }),
          fname: z.string().min(2, { message: "First name is required" }),
          lname: z.string().min(2, { message: "Last name is required" }),
          street: z.string().min(10, { message: "Street is required" }),
          address: z.string().min(10, { message: "Address is required" }),
          postalCode: z.string().regex(/^\d{6}$/g, { message: "Enter a valid postal code" }),
          city: z.string().min(2, { message: "City is required" }),
          phone: z.string().regex(/^\d{10}$/g, { message: "Enter a valid phone number" }),
        });

        const summaryResponse = summaryValidate.safeParse({ email: session?.email ?? email, fname, lname, street, address, postalCode, city, phone })
        if (!summaryResponse.success) {
          const errors = summaryResponse.error.errors.map(
            e => {
              return { for: e.path[0], message: e.message } as FormError
            }
          )
          setFormErrors(errors)
          return
        }
      }

      nextSection()
    }
    else makePayment();
  }, [active, session?.email, email, fname, lname, street, address, postalCode, city, phone, cart, sections, active.length])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        onSubmit();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSubmit]);


  const CapitalText = (text: string) => {
    return text[0].toUpperCase() + text.slice(1).toLowerCase()
  }
  useEffect(
    () => {
      (async () => {
        if (postalCode.length == 6) {
          const shippingData = await CheckServiceAvailability(+postalCode);
          if (shippingData) {
            setCity(CapitalText(shippingData.city))
            setState(CapitalText(shippingData.state))
          } else {
            setCity("")
            setState("")
            if (formErrors) {
              setFormErrors([...formErrors, { for: "postalCode", message: "Invalid postal code" }])
            } else {
              setFormErrors([{ for: "postalCode", message: "Invalid postal code" }])
            }
          }
        } else if (postalCode.length > 6) {
          if (formErrors) {
            setFormErrors([...formErrors, { for: "postalCode", message: "Invalid postal code" }])
          } else {
            setFormErrors([{ for: "postalCode", message: "Invalid postal code" }])
          }
        }
      })()
    }
    , [postalCode])

  const [isNewAddress, setIsNewAddress] = useState<boolean>(true);
  const [addresses, setAddresses] = useState<AddressType[] | null>(null);
  const [selectAddress, setSelectAddress] = useState<boolean>(false);

  useEffect(() => {
    if (session) {
      GetAddresses(session.email).then((data) => {
        setAddresses(data)
        setSelectAddress(true)
      })
    }
  }, [])

  const setUserAddress = (userAddress: AddressType) => {
    setIsNewAddress(false)
    setFname(userAddress.fname);
    setLname(userAddress.lname);
    setStreet(userAddress.street);
    setAddress(userAddress.address);
    setPostalCode(userAddress.postalCode);
    setCity(userAddress.city);
    setState(userAddress.state);
    setPhone(userAddress.phone);

    setSelectAddress(false);
  }
  const setNewAddress = () => {
    setFname("");
    setLname("");
    setStreet("");
    setAddress("");
    setPostalCode("");
    setCity("");
    setState("");
    setPhone("");

    setSelectAddress(false);
  }

  const { setLogin, showLogin } = useLoginStore((state) => state);
  return (
    <div>
      <Auth path="/checkout?path=/" />
      <div className={`lg:absolute w-full h-full flex flex-col ${showLogin && "blur-lg"}`}>
        <div className="w-full py-vw-7-min@lg lg:hidden flex items-center justify-center">
          <Link href="/">
            <Image
              src={GetImage("img/logo-low.svg")}
              alt="logo"
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto h-vw-14-min@lg"
            />
          </Link>
        </div>

        <div className={`lg:w-[45%] w-full h-full flex flex-col lg:items-start items-center bg-accent lg:py-vw-20 py-vw-10-max@sm lg:pl-vw-10 lg:fixed lg:right-0`}>

          <div onClick={() => setShowProducts(!showProducts)} className={`lg:hidden font-ibm cursor-pointer flex flex-row w-full items-center justify-between px-vw-20 ${showProducts && `pb-vw-10`}`}>

            <div className="flex flex-row gap-1 items-center">
              <Image src={GetImage("img/cart-dark.svg")} alt="cart" width={0} height={0} sizes="100vw" className="w-[25px] h-auto" />
              <p className="text-smTolg font-[500]">{showProducts ? "Hide" : "Show"} Order Summary</p>
              <Image src={GetImage(showProducts ? "img/up.svg" : "img/down.svg")} alt="show" width={0} height={0} sizes="100vw" className={`w-[20px] h-auto mt-1 `} />
            </div>
            <p className="text-lgTo2xl">₹{cart?.products.reduce((a, b) => a + (b.price * (b.quantity || 1)), 0)}</p>
          </div>


          <div className={`${!showProducts ? `hidden` : `flex items-center justify-center`} lg:flex lg:items-start lg:justify-start w-full`}>
            <div className={`lg:w-vw-120-max@xl w-full max-w-vw-200-min@sm-max@lg max-[440px]:px-5`}>
              {cart && cart.products && cart.products.length > 0 && (
                <div>
                  {cart.products.flatMap((product, index) => (
                    <CheckoutProduct
                      key={index}
                      product={product}
                    />
                  ))}
                  <div className="w-full h-[1px] mt-4 bg-background opacity-50"></div>
                  <div className="w-full font-ibm font-[500]">
                    <div className="w-full pt-vw-4 flex flex-row justify-between items-baseline">
                      <p className="text-smTolg">Subtotal</p>
                      <p className="text-smTolg">₹{cart?.products.reduce((a, b) => a + (b.price * (b.quantity || 1)), 0)}</p>
                    </div>
                    <div className="pt-vw-1 w-full flex flex-row justify-between items-baseline">
                      <p className="text-smTolg">Shipping</p>
                      <p className="text-xsTosm">{active.includes("Shipping") ? "₹0" : "(Calculated at next step)"}</p>
                    </div>
                    <div className="py-vw-4 text-xl w-full flex flex-row justify-between items-baseline">
                      <p className="text-lgTo2xl">Total</p>
                      <p className="text-lgTo2xl">INR ₹{cart?.products.reduce((a, b) => a + (b.price * (b.quantity || 1)), 0)}</p>
                    </div>
                  </div>
                  <div className="w-full h-[1px] mb-vw-7 bg-background opacity-50"></div>

                </div>
              )}
            </div>
          </div>

        </div>

        <div className="lg:w-[55%] w-[80%] h-full lg:pt-vw-10-min@lg pt-3 flex lg:mx-0 mx-auto justify-end">
          <div className="w-[100%] h-full flex lg:items-end items-center lg:pr-vw-10 flex-col">

            <Link href="/">
              <Image
                src={GetImage("img/logo-high.svg")}
                alt="logo"
                width={0}
                height={0}
                sizes="100vw"
                className="hidden lg:flex w-auto h-vw-14-min@lg-max@xl"
              />
            </Link>

            <div className="w-[400px] font-ibm text-[#c4c4c4] text-sm max-[388px]:text-xsTosm flex flex-row items-center justify-center pt-5 gap-vw-1">
              {sections.flatMap((section, index) => {
                return (
                  <div key={index} className="flex flex-row items-center justify-start gap-2">
                    <p className={`${active.includes(section) && "text-accent"}`}>{section}</p>
                    {index < sections.length - 1 && <Next active={active.includes(section)} />}
                  </div>
                )
              })}
            </div>

            <div className="lg:max-w-[55%] md:max-w-[60%] max-w-[360px] w-[100%]  h-[1px] lg:my-vw-7 my-5 bg-accent opacity-50"><p className="invisble">a</p></div>

            {active.slice(active.length - 1)[0] === "Summary" && (
              <div className="lg:w-vw-140-max@xl lg:min-w-0 min-w-vw-180-min@sm max-[388px]:min-w-5 max-[388px]:w-vw-300 flex flex-col pb-vw-2 ">
                <form className="w-full font-ibm text-accent flex flex-col items-end gap-2">
                  <div className="flex flex-row w-full justify-end items-baseline">
                    <label className="text-lgTo2xl max-[388px]:text-smTolg">Contact</label>
                  </div>
                  <div className={`w-full text-[#a4a4a4] cursor-pointer`} onClick={!session?.email ? () => {
                    setLogin(true)
                  } : undefined}>
                    <div className="pointer-events-none">
                      <Field value={session?.email || email} name="email" placeholder="Email" onChange={setEmail} formErrors={formErrors} setFormErrors={setFormErrors} />
                    </div>
                  </div>
                </form>

                <form className="w-full pt-vw-5-min@xl font-ibm text-accent flex flex-col items-end gap-4">
                  <div className="w-full flex flex-col gap-2">
                    <div className={`flex flex-row w-full justify-between items-baseline`}>
                      {selectAddress ? <label className="text-lgTo2xl max-[388px]:text-smTolg">Select Address</label> : session && (
                        <label className="text-xsTosm text-green-600 cursor-pointer" onClick={() => setSelectAddress(true)}>Change Address?</label>
                      )}
                      <label className="text-lgTo2xl max-[388px]:text-smTolg">Shipping Address</label>
                    </div>

                    {!selectAddress && (
                      <label className={`flex flex-col justify-center w-full text-[12px] pl-3 py-2 rounded-[2px] border-[1px] border-[#a4a4a4] focus:border-[2px] focus:border-white text-[#a4a4a4] pointer-events-none`}>
                        Country
                        <input className={`w-full bg-transparent outline-none placeholder:text-sm text-[16px] placeholder:text-gray pointer-events-none text-accent`} placeholder="Country" value={"India"} onChange={(e) => { }} />
                      </label>
                    )}

                  </div>
                  {selectAddress && addresses && addresses.length > 0 ? (<div className="w-full h-auto rounded-[2px] border-[1px] border-white text-[#a4a4a4] text-sm">
                    {addresses?.flatMap((userAddress: AddressType, index) => {
                      return (
                        <div>
                          <div className="w-full flex flex-row justify-between items-center cursor-pointer" onClick={() => setUserAddress(userAddress)}>
                            <div className="flex flex-col p-4">
                              <p className="font-bold text-accent">{userAddress?.fname} {userAddress?.lname}</p>
                              <p className="">{userAddress?.street}</p>
                              <p className="">{userAddress?.address}</p>
                              <p className="">{userAddress?.postalCode}, {userAddress?.city}</p>
                              <p className="">India</p>
                              <p className="">+91 {userAddress?.phone}</p>
                            </div>
                            <p className="px-4 text-accent text-smToLg">
                              Select
                            </p>
                          </div>
                          <div className="w-full h-[1px] bg-[#a4a4a4]"></div>
                        </div>
                      )
                    })}
                    <p className="cursor-pointer grid place-items-center p-2 md:p-3 font-[500] text-black bg-accent text-xsTosm" onClick={() => setNewAddress()}>
                      Enter New Address
                    </p>
                  </div>) : (
                    <>
                      <div className="w-full flex lg:flex-row md:flex-row flex-col lg:gap-4 md:gap-4 gap-7">
                        <Field value={fname} name="fname" placeholder="First Name" onChange={setFname} formErrors={formErrors} setFormErrors={setFormErrors} />
                        <Field value={lname} name="lname" placeholder="Last Name" onChange={setLname} formErrors={formErrors} setFormErrors={setFormErrors} />
                      </div>
                      <Field value={street} onChange={setStreet} name="street" placeholder="Apartment, Landmark, Street" formErrors={formErrors} setFormErrors={setFormErrors} />
                      <Field value={address} onChange={setAddress} name="address" placeholder="Address" formErrors={formErrors} setFormErrors={setFormErrors} />
                      <div className="w-full flex lg:flex-row md:flex-row flex-col lg:gap-4 md:gap-4 gap-7">
                        <Field value={postalCode} onChange={setPostalCode} name="postalCode" placeholder="Postal Code" formErrors={formErrors} setFormErrors={setFormErrors} />
                        <div className="pointer-events-none w-full">
                          <Field value={city} onChange={setCity} name="city" placeholder="City" formErrors={formErrors} setFormErrors={setFormErrors} />
                        </div>
                      </div>
                      <Field value={phone} onChange={setPhone} name="phone" placeholder="Phone No." formErrors={formErrors} setFormErrors={setFormErrors} />
                    </>
                  )}
                </form>
              </div>
            )}

            {active.includes("Shipping") && (
              <div className="lg:w-vw-140-max@xl lg:min-w-0 min-w-vw-180-min@sm max-[388px]:min-w-5 max-[388px]:w-vw-300 flex flex-col my-5 pb-vw-10 ">
                <div className="w-full font-ibm text-accent flex flex-col gap-2 border-[1px] border-[#a4a4a4] px-4 py-3 rounded-[4px]">
                  <div className="flex flex-row items-center justify-between text-xsTosm">
                    <div className="flex flex-row gap-vw-8">
                      <p className="text-[#c4c4c4] max-w-16 min-w-14">Contact</p>
                      <p>{(session?.email || email) + ", +91" + phone}</p>
                    </div>
                    <p onClick={() => setActive(active.slice(0, 2))} className="text-[#c4c4c4] text-sm underline underline-offset-2 cursor-pointer">Change</p>
                  </div>

                  <div className="lg:min-w-[55%] min-w-full h-[1px] lg:my-2 my-1 bg-accent opacity-50"><p className="invisible">a</p></div>

                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row gap-vw-8 text-xsTosm">
                      <p className="text-[#c4c4c4] max-w-16 min-w-14">Ship To</p>
                      <p>{`${street + ", " + address + ", " + postalCode + " " + city}`}</p>
                    </div>
                    <p onClick={() => setActive(active.slice(0, 2))} className="text-[#c4c4c4] text-sm underline underline-offset-2 cursor-pointer">Change</p>
                  </div>

                  {active.includes("Payment") && (<div>
                    <div className="lg:min-w-[55%] min-w-full h-[1px] lg:my-2 my-2 bg-accent opacity-50"><p className="invisible">a</p></div>

                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row gap-vw-8 text-xsTosm">
                        <p className="text-[#c4c4c4] max-w-16 min-w-14">Ship By</p>
                        <p>{`Free Shipping -  ₹0`}</p>
                      </div>
                    </div>
                  </div>)}

                  {active.includes("Review") && (<div>
                    <div className="lg:min-w-[55%] min-w-full h-[1px] lg:my-2 my-2 bg-accent opacity-50"><p className="invisible">a</p></div>

                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row gap-10 text-xsTosm">
                        <p className="text-[#c4c4c4] max-w-16 min-w-14">Payment</p>
                        <p className="flex flex-row gap-1"><Image
                          src={GetImage("img/razorpay-icon.svg")}
                          alt="show"
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="w-auto h-[20px]"
                        />Razorpay</p>
                      </div>
                    </div>
                  </div>)}

                </div>

                {active.slice(active.length - 1)[0] === "Shipping" && (<div>
                  <p className="mt-10 font-ibm text-lgToxl text-white">Shipping Method</p>
                  <div className="mt-3 w-full font-ibm text-accent flex flex-col gap-2 border-[1px] border-white px-4 py-3 rounded-[4px]">
                    <div className="flex flex-row items-center justify-between">
                      <p className="text-[#c4c4c4]">Free Shipping - ₹0</p>
                      <p className="text-[#c4c4c4] text-sm ">Within a Week</p>
                    </div>
                  </div>
                </div>
                )}

                {active.slice(active.length - 1)[0] === "Payment" && (<div>
                  <p className="mt-10 font-ibm text-lgToxl text-white">Payment</p>
                  <p className="mt-1 font-ibm text-xsTosm text-[#c4c4c4]">All transactions are secure and encrypted.</p>
                  <div className="mt-3 w-full font-ibm text-accent flex flex-col gap-2 border-[1px] border-white px-4 py-4 rounded-[4px]">
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex flex-row gap-2">
                        <input type="radio" className="appearance-none w-[15px] h-[15px] bg-white border-[4px] border-[#3998FE] rounded-xl self-center" />
                        <p className="text-lg text-white">Razorpay</p>
                      </div>
                      <RazorPay />
                    </div>
                  </div>
                </div>
                )}

                {active.slice(active.length - 1)[0] === "Review" && (<div>
                  <div className="mt-7 w-full font-ibm text-accent flex flex-col gap-2 border-[1px] border-[#c4c4c4] px-4 py-4 rounded-[4px]">
                    <div className="w-full flex flex-row justify-between items-baseline">
                      <p className="text-smTolg">Subtotal</p>
                      <p className="text-smTolg">₹{cart?.products.reduce((a, b) => a + (b.price * (b.quantity || 1)), 0)}</p>
                    </div>
                    <div className="w-full flex flex-row justify-between items-baseline">
                      <p className="text-smTolg">Shipping</p>
                      <p className="text-xsTosm"> ₹0</p>
                    </div>
                    <div className="py-vw-2 text-xl w-full flex flex-row justify-between items-baseline">
                      <p className="text-lgTo2xl">Total</p>
                      <p className="text-lgTo2xl">INR ₹{cart?.products.reduce((a, b) => a + (b.price * (b.quantity || 1)), 0)}</p>
                    </div>
                  </div>
                </div>
                )}
              </div>
            )}
            <div className="lg:w-vw-140-max@xl lg:min-w-0 min-w-vw-180-min@sm max-[388px]:min-w-5 max-[388px]:w-vw-300 flex lg:flex-row md:flex-row flex-col-reverse lg:gap-0 md:gap-0 gap-4 items-center justify-between py-vw-2 font-ibm text-accent text-sm">
              <div className="flex flex-row items-center ">
                <Prev />
                <p onClick={previousSection} className="cursor-pointer text-xsTosm">Return to {active[active.length - 2]}</p>
              </div>
              <p onClick={onSubmit} className={`cursor-pointer text-xsTosm ${sections[active.length] ? "bg-accent text-background py-3 hover:bg-[#c4c4c4]" : "py-2.5 bg-blue-600 text-accent hover:bg-[#3998FE] active:bg-[#3998FE] font-extrabold"}  active:bg-[#c4c4c4] text-center  px-4 lg:w-auto md:w-auto w-full rounded-sm font-[500] mt-3 md:mt-2  lg:mt-0`}>
                {sections[active.length] ? "Continue to " + sections[active.length] : "Pay with Razorpay"}
              </p>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
