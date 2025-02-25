"use client";
import React, { useEffect, useMemo, useState } from "react";
import { CartTransition } from "@/layouts/CartTransition";
import { FitTexture } from "../TextureOverlay";
import { AddToCart, CartType, DecreaseQnty, GetCart, IncreaseQnty, RemoveFromCart } from "@/app/utils/database/carts";
import { AddToCartCookies, CartCookieType, DecreaseQntyCookies, GetCartFromCookies, IncreaseQntyCookies, RemoveFromCartCookies } from "@/app/utils/cookies/cart";
import Image from "next/image";
import { ProductType } from "@/app/utils/database/collections";
import { useSession } from "@/app/providers/Session";
import { motion } from 'framer-motion';
import { useRouter, usePathname } from "next/navigation";
import { useCartStore } from "@/app/utils/store/cartStore";
import { GetImage } from "@/app/components";

export const getDiscount = (products: ProductType[]) => {
	let nPosters = products.reduce((a, b) => a + (b.quantity || 0), 0);
	let total = products.reduce((a, b) => a + (b.price * (b.quantity || 1)), 0);

	const stickers = products.find(product => product.title === "Stickers");
	if (stickers) {
		total -= stickers.price * stickers.quantity!;
		nPosters -= stickers.quantity!;
	}
	
	let description = "";
	let discount = 0;

	if (nPosters === 2) {
		description = "₹150 off on purchase of 2 posters";
		discount = 150;
	} else if (nPosters === 3) {
		description = "₹250 off on purchase of 3 posters";
		discount = 250;
	} else if (nPosters > 3) {
		description = "₹100 off on each posters, on purchase of 4 or more posters";
		if (stickers) {
			description += " & more 20% off on stickers";
		}
		let stickersPrice = stickers ? stickers.price * stickers.quantity! : 0;
		discount = (total + stickersPrice) * (20 / 100);
	} else {
		description = "";
		discount = 0;
	}

	discount = Math.round(discount);
	return { description, discount };
}

export const availDiscount = (products: ProductType[]) => {
	const { discount } = getDiscount(products);
	const total = products.reduce((a, b) => a + (b.price * (b.quantity || 1)), 0);

	return Math.round((total - discount));
}

const CartProduct = ({ user, product, onClick, updateTotal }: { user: string | undefined, product: ProductType, onClick: () => void, updateTotal: () => void}) => {

	const [stateProduct, setStateProduct] = useState<ProductType | null>();

	const [x, setX] = useState("0");
	const removeProduct = () => {
		setX("100%");
		setTimeout(() => onClick(), 500)
	};

	const { session } = useSession();

	useEffect(() => {
		setStateProduct(product)
	}, [product])

	const decreaseQnty = async () => {
		var updatedProduct: ProductType | undefined = undefined;
		if (stateProduct) {
			if (session) {
				updatedProduct = await DecreaseQnty(session?.email, stateProduct);
			} else {
				updatedProduct = await DecreaseQntyCookies(stateProduct);
			}
		}
		if (updatedProduct) {
			setStateProduct(updatedProduct);
			updateTotal()
		}
	}


	const increaseQnty = async () => {
		var updatedProduct: ProductType | undefined = undefined;
		if (stateProduct) {
			if (session) {
				updatedProduct = await IncreaseQnty(session?.email, stateProduct);
			} else {
				updatedProduct = await IncreaseQntyCookies(stateProduct);
			}
		}
		if (updatedProduct) {
			setStateProduct(updatedProduct);
			updateTotal()
		}
	}
	
	if (!stateProduct?.price || !stateProduct?.quantity) return null;

	return (
		<motion.div
			initial={{ opacity: 1, x: x, width: "100%" }}
			animate={{ opacity: 1, x: x, width: "100%" }}
			exit={{ opacity: 0, x: x, width: "100%" }}
			transition={{ duration: 0.5, type: "tween" }}
		>
			{stateProduct && (<div className="w-full flex flex-row justify-center gap-5 px-5">
				<div className="bg-[#c7c7c7] border-black border-[1px] shadow-[5px_5px_0px_0px_rgba(70,70,70)] pt-3 pb-2 w-full flex flex-row justify-center gap-5">
					<Image
						src={GetImage(stateProduct.id)}
						alt=""
						width={0}
						height={0}
						sizes="10vw"
						className="min-w-[90px] h-auto self-start ml-2 shadow-lg"
					/>
					<div className="w-full py-1 flex flex-col justify-between text-black opacity-80 font-ibm font-[600] text-sm">
						<div className="flex flex-col gap-2">
							<p>{stateProduct.title}</p>
							{!stateProduct.hide && <p className="cursor-pointer">Size: {stateProduct.size}</p>}
						</div>
						<div className="active:mb-0.5 active:ml-0.5 duration-[300ms] ease-in-out flex flex-row items-center justify-center gap-2 bg-[#c7c7c7] text-black w-20 dropshadow border-black border-[1px] mb-1">
							<p onClick={decreaseQnty} className="font-retro  font-[400] cursor-pointer text-[28px] border-black border-r-[2px] px-[4px] py-[1px]">-</p>
							<p className="text-[14px]  px-[1px]">{stateProduct.quantity}</p>
							<p onClick={increaseQnty} className="font-retro  font-[400] cursor-pointer text-[20px] border-black border-l-[2px] px-[3px] py-[1px]">+</p>
						</div>
					</div>
					<div className="flex h-full flex-row items-center justify-center opacity-80">
						<div className="w-[2px] h-full bg-[#333333]" />
						<div className="flex flex-col h-full justify-between pt-1 ">
							<p className="font-ibm text-sm font-[600] text-center mx-4">Price<br />{(stateProduct.price * stateProduct.quantity!).toFixed(2)}</p>
							<p onClick={() => { setTimeout(() => removeProduct(), 50) }} className="mb-2.5 active:mb-2 active:mr-[10px] duration-50 cursor-pointer font-ibm text-sm font-[600] text-center mx-4 px-2 py-[1px] bg-red-700 text-accent border-black border-[1px] dropshadow">Remove</p>
						</div>

					</div>
				</div>

			</div>)}
		</motion.div>
	)
}


const Cart = () => {
	const router = useRouter();
	const path = usePathname();
	const goToCheckout = () => {
		router.push("/checkout?path=" + path);
	}

	const [mobile, setMobile] = useState(false);
	const [cart, setCart] = useState<CartType | CartCookieType | null>(null);
	const { session } = useSession();

	const [productToRemove, setProductToRemove] = useState<ProductType | null>(null);
	const { showCart, switchCart, setIsFull, hasStickers, setHasStickers } = useCartStore((state) => state)

	const [stickers, setStickers] = useState(hasStickers);

	const refreshCart = async () => {
		var cart: CartType | CartCookieType | null = null;
		if (session) {
			cart = await GetCart(session.email)
		} else {
			const cartCookie = await GetCartFromCookies();
			if (cartCookie) {
				cart = JSON.parse(cartCookie)
			}
		}
		cart?.products.reverse();

		if (cart?.products.some(product => product.title === "Stickers")) {
			console.log("stickers");
			setHasStickers(true);
			setStickers(true);
		}
		setCart(cart)
	}


	useEffect(() => {
		refreshCart()
	}, [showCart, session])

	const removeFromCart = async () => {
		if (productToRemove) {
			var updatedCart: CartType | undefined = undefined;

			if (session) {
				updatedCart = await RemoveFromCart(session.email, productToRemove);
			} else {
				updatedCart = await RemoveFromCartCookies(productToRemove);
			}

			if (updatedCart) {
				setProductToRemove(null)
				return updatedCart
			}
		}
	}

	useEffect(() => {
		if (productToRemove) {
			removeFromCart().then((cart) => {
				if (cart) {
					cart.products.reverse();
					const existsStickers = cart.products.map(product => product.title).includes("Stickers");
					if (cart.products.length === 1) {
						if (existsStickers) {
							setStickers(false);
						} else {
							setStickers(existsStickers)
						}
					} 
					setCart(cart)
				}
			})
		}
	}, [productToRemove])

	useEffect(() => {
		setMobile(window.innerWidth < 640);
		if (showCart) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}

		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [showCart, mobile]);


	const [total, setTotal] = useState(0);
	useEffect(() => {
		setTotal(cart?.products.reduce((a, b) => a + (b.price * (b.quantity || 1)), 0) || 0)
		cart && setIsFull(cart?.products.length > 0)
	}, [cart, stickers])

	const updateTotal = () => {
		refreshCart().then(() => setTotal(cart?.products.reduce((a, b) => a + (b.price * (b.quantity || 1)), 0) || 0))
	}

	const sticker = useMemo(() => ({
		id: "679a45812304d14c05091911",
		title: "Stickers",
		price: 49,
		quantity: 1,
		size: "M",
		collection: "Comics",
		hide: true
	}), []);

	useEffect(() => {
		setHasStickers(stickers);
	}, [stickers, setHasStickers]);

	useEffect(() => {
		if (stickers === hasStickers) return;
		
		const user = session?.email || "";
		const action = stickers ? AddToCart : RemoveFromCart;
		const cookieAction = stickers ? AddToCartCookies : RemoveFromCartCookies;
		
		const updateCart = async () => {
			if (user !== "") {
				await action(user, sticker);
				updateTotal();
			} else {
				await cookieAction(sticker);
				updateTotal();
			}
		};

		updateCart();
	}, [stickers]);

	return (
		<CartTransition animate={showCart} mobile={mobile}>
			<div className="w-full h-full flex flex-col items-center justify-between overflow-y-scroll">
				<FitTexture />

				<div className={`w-full ${stickers ? "max-h-[48%]" : "max-h-[55%] "}`}>
					<div className="w-full flex flex-row items-center justify-between pl-6 pr-4 pt-vw-16-max@sm">
						<p className="text-accent font-retro text-lg">
							{cart?.products && cart?.products.length > 0 ? `${cart.products.length} Product${cart.products.length > 1 ? "s" : ""}` : "CART"}
						</p>
						<div
							className="w-[85px] h-[30px] border-black border-[1px] dropshadow font-ibm font-[800] text-black bg-[#c7c7c7] hover:bg-red-500 active:bg-red-500 cursor-pointer flex items-center justify-center active:mt-1 mr-2 active:mr-1 duration-50"
							style={{ fontSize: "14px" }}
							onClick={() => { setTimeout(() => switchCart(), 50) }}
						>
							CLOSE
						</div>
					</div>


					<div className="w-full max-h-[87%] mb-10 flex flex-col mt-vw-16-max@sm overflow-y-scroll">
						{cart && cart.products.length > 0 ? (<div className="w-full flex flex-col gap-5 items-start justify-center">
							{cart.products.map((product) => {
								return <CartProduct key={`${product.title}${product.size}${product.quantity}`} user={session?.email} product={product} onClick={() => { setProductToRemove(product) }} updateTotal={updateTotal} />
							})}
						</div>) : <p className="text-accent font-retro text-sm box-border w-full h-[400px] grid place-items-center">Nothing to see here.</p>}
					</div>
				</div>


				<div className="w-full flex flex-col gap-vw-2-min@xl items-center justify-center py-9">
					{cart && cart.products.length > 0 &&
						<>
							<div className="w-[85%] min-h-[100px] flex flex-row justify-center gap-6">
								<Image
									src={GetImage("img/sticker-black.jpg")}
									alt=""
									width={0}
									height={0}
									sizes="100vw"
									className="w-36 lg:w-40 h-auto"
								/>

								<div className="text-accent py-3 flex flex-col items-center justify-between">
									<div className="flex flex-col">
										<p className="font-retro text-lg lg:text-xl">Get <span className="text-yellow-500 text-2xl lg:text-4xl">11</span> Cool Stickers.</p>
										<p className="font-retro text-sm lg:text-lg">For The Price Of <span className="text-yellow-500 text-lg lg:text-2xl">49</span> Only.</p>
									</div>

									<div className="flex flex-col">
										<button onClick={() => setStickers(!stickers)} className={`${stickers ? "border-green-500" : "border-accent"} py-0.5 md:py-1.5 w-[150px] rounded-sm px-4 border-2 flex flex-row items-center justify-center gap-3`}>
											<p className={`${stickers ? "text-green-500" : "text-white"} font-ibm text-sm lg:text-lg`}>{stickers ? "Added" : "Get Now"}</p>
										</button>
										<p className="font-retro text-yellow-500 text-xs lg:text-sm mt-1 text-center">ONLY A FEW LEFT</p>
									</div>
								</div>
							</div>

							{cart.products.reduce((a, b) => a + (b.quantity || 0), 0) > 1 && (
								<div className="cursor-pointer dropshadow w-[85%] py-vw-2-min@xl flex flex-row items-center justify-between px-vw-4-min@xl bg-[#c7c7c7] text-smTolg text-black font-ibm font-[600]">
									<p>DISCOUNT</p>
									<span className="text-red-500 " title="this price is rounded to a whole number">
									{Math.ceil(getDiscount(cart.products).discount) > 0 ? `-₹${Math.ceil(getDiscount(cart.products).discount)}` : <span className="text-black text-sm font-[600] text-red-600">Add More for Discount</span>}
									</span>
								</div>
							)}
							<div onClick={goToCheckout} className="cursor-pointer dropshadow w-[85%] py-vw-2-min@xl flex flex-row items-center justify-between px-vw-4-min@xl bg-[#c7c7c7] text-smTolg text-black font-ibm font-[600]">
								<p>CHECKOUT</p>
								<span title="this price is rounded to a whole number">
									₹{Math.ceil(availDiscount(cart.products))}
								</span>
							</div>
							<p className="text-accent font-ibm text-xs text-center w-full">Tax incl. Shipping calculated at checkout. </p>
						</>
					}
				</div>
			</div>
		</CartTransition>
	);
};

export default Cart;

