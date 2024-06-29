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
                                style={{ backgroundImage: "url('https://images2.imgbox.com/41/66/g6TuqFcK_o.png')", height: '350px', maxWidth: '600px', backgroundPosition: "cover" }}
                            >
                                <Row className="m-0">
                                    <Column align="center">
                                        <Img className="pointer-events-none mx-auto" src="https://images2.imgbox.com/fc/b5/kbt2Vi7j_o.png" width={150} />
                                    </Column>
                                </Row>
                                <Row className="m-0 py-20">
                                    <Column align="center">
                                        <Button className="p-0 m-0" href={url}>
                                            <Img src={authType === "login" ? "https://images2.imgbox.com/cb/bf/Rz9nQx7g_o.png" : "https://images2.imgbox.com/50/fd/RYb53g5B_o.png"} width={100} className="mx-auto pointer-events-none" />
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
