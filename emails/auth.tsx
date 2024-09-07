import React from 'react';
import { Html, Head, Body, Preview, Container, Tailwind, Section, Row, Column, Link, Text, Img, Button } from '@react-email/components';


export function AuthEmail(authType: string, url: string) {
    return (
        <Html>
            <Head />
            <Tailwind>
                <Body className="bg-[#070707] select-none">
                    <Container className="max-w-[600px] mx-auto">
                        <Section className="bg-[#070707]">
                            <Section
                                className="relative bg-cover"
                                style={{ backgroundImage: "url('cid:bg.png')", height: '350px', maxWidth: '600px', backgroundPosition: "cover" }}
                            >
                                <Row className="m-0">
                                    <Column align="center">
                                        <Img className="pointer-events-none mx-auto" alt="logo" src="cid:logo.png" width={150} />
                                    </Column>
                                </Row>
                                <Row className="m-0 py-20">
                                    <Column align="center">
                                        <Button className="p-0 m-0" href={url}>
                                            <Img src={authType === "login" ? 
                                                "cid:login.png" 
                                                : "cid:signup.png"
                                                } width={100} className="mx-auto pointer-events-none" />
                                        </Button>
                                        <Text className="m-0 text-[#FDFDFD] leading-[20px] text-[14px] font-[400] color-fffffe text-center uppercase" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                                            This link will expire in 10 minutes, <br />ignore if you didn&apos;t make the request.
                                        </Text>
                                    </Column>
                                </Row>
                                <Row className="m-0 p-0">
                                    <Column align="center">
                                        <Text className="m-0 text-[#FDFDFD] text-[12px] font-semibold color-fffffe text-center" style={{ lineHeight: '10px', fontFamily: 'Lucida Grande, Lucida Sans Unicode, Lucida Sans, Geneva, Verdana, sans-serif' }}>
                                            Checkout our Store now!
                                        </Text>
                                        <Text className="pt-[6px] m-0 text-[#FDFDFD] text-[12px] font-[200] color-fffffe text-center" style={{ lineHeight: '11px', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                                            ©ALLCAPZ 2024. ALL RIGHTS RESERVED
                                        </Text>
                                    </Column>
                                </Row>
                            </Section>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}


export function OrderConfirmEmail(name: string, url: string) {
    return (
        <Html>
            <Head />
            <Tailwind>
                <Body className="bg-[#070707] select-none">
                    <Container className="max-w-[600px] mx-auto">
                        <Section className="bg-[#070707]">
                            <Section
                                className="relative bg-cover"
                                style={{ backgroundImage: "url('https://i.imgur.com/vQbxbBN.png')", height: '350px', maxWidth: '600px', backgroundPosition: "cover" }}
                            >
                                <Row className="m-0 mt-6">
                                    <Column align="center">
                                        <Img className="pointer-events-none mx-auto" src="https://i.imgur.com/io0azSe.png" width={150} />
                                    </Column>
                                </Row>
                                <Row className="m-0 py-16">
                                    <Column align="center">
                                        <Text className="m-0 text-[#FDFDFD] leading-[20px] text-[14px] font-[400] color-fffffe text-center uppercase" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                                            Thank you {name}, for your purchase at ALLCAPZ!<br />We’re excited to let you know that your order<br /> has been received and is being processed.
                                        </Text>
                                        <Button className="p-0 m-0 my-4" href={url}>
                                            <Img src={"https://i.imgur.com/01j7NWL.png"} width={100} className="mx-auto pointer-events-none" />
                                        </Button>
                                        <Text className="m-0 text-[#FDFDFD] leading-[20px] text-[14px] font-[400] color-fffffe text-center uppercase" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                                            Reply to this email if you have any query!
                                        </Text>
                                    </Column>
                                </Row>
                                <Row className="m-0 p-0 mb-6">
                                    <Column align="center">
                                        <Text className="m-0 text-[#FDFDFD] text-[12px] font-semibold color-fffffe text-center" style={{ lineHeight: '10px', fontFamily: 'Lucida Grande, Lucida Sans Unicode, Lucida Sans, Geneva, Verdana, sans-serif' }}>
                                            Checkout our Store now!
                                        </Text>
                                        <Text className="pt-[6px] m-0 text-[#FDFDFD] text-[12px] font-[200] color-fffffe text-center" style={{ lineHeight: '11px', fontFamily: 'Helvetica, Arial, sans-serif' }}>
                                            ©ALLCAPZ 2024. ALL RIGHTS RESERVED
                                        </Text>
                                    </Column>
                                </Row>
                            </Section>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    ); 
}