import React from 'react';
import { Html, Head, Body, Preview, Container, Tailwind, Section, Row, Column, Link, Text, Img } from '@react-email/components';

export function WelcomeEmail(name: string) {
    return (
        <Html>
            <Head />
            <Preview>Hey, Welcome to ALLCAPZ.IN</Preview>
            <Tailwind>
                <Body className="bg-black my-auto mx-auto">
                    <Container className="bg-[url('https://graph.org/file/51d9569396ec7b92137a7.jpg')] bg-cover my-[40px] mx-auto p-[30px] max-w-[600px]">
                        <Section>
                            <Row>
                                <Column align='left'><Img src="https://graph.org/file/c118dc35629e21153f8e1.png" width={120} />
                                </Column>

                                <Column align='right'><Img src="https://images2.imgbox.com/66/76/en42wKB5_o.png" width={180} /></Column>
                            </Row>
                        </Section>


                        <Section className="text-center mt-12">
                            <Row className="mb-[-15px]">
                                <Column align='center'>
                                    <Img src="https://images2.imgbox.com/57/7f/0rTJDS1h_o.png" width={100} height={100} sizes='100vw' className='w-auto h-[45px]' />
                                </Column>
                            </Row>
                        </Section>

                        <Section className="mt-2">
                            <Row>
                                <Column align="center">
                                    <Link href="https://allcapz.in/"><Img src="https://images2.imgbox.com/6b/dc/KpMX0EnH_o.png" width={130} /></Link>
                                </Column>
                            </Row>
                        </Section>

                        <Section className="mt-5">
                            <Row>
                                <Column align="center">
                                    <Row className="mb-[-15px]">
                                        <Column className="w-0 pl-[100px]" align="center">
                                            <Link href="https://allcapz.in/">
                                                <Img src="https://images2.imgbox.com/f3/86/U1iv1fO2_o.png" width={100} height={100} sizes='100vw' className='w-auto h-[10px]' />
                                            </Link>
                                        </Column>

                                        <Column align="center"><Text className="text-[15px] px-[5px]" style={{ fontFamily: "Roboto", color: "#DBDBDB", fontWeight: "bold" }}>|</Text></Column>

                                        <Column className="w-0 px-[1px]" align="center">
                                            <Link href="https://allcapz.in/">
                                                <Img src="https://images2.imgbox.com/94/39/HqmbV9fX_o.png" width={100} height={100} sizes='100vw' className='w-auto h-[10px]' />
                                            </Link>
                                        </Column>

                                        <Column align="center"><Text className="text-[15px] px-[5px]" style={{ fontFamily: "Roboto", color: "#DBDBDB", fontWeight: "bold" }}>|</Text></Column>


                                        <Column className="w-0 px-[1px]" align="center">
                                            <Link href="https://allcapz.in/">
                                                <Img src="https://images2.imgbox.com/e9/6e/3VPDffP1_o.png" width={100} height={100} sizes='100vw' className='w-auto h-[10px]' />
                                            </Link>
                                        </Column>

                                        <Column align="center"><Text className="text-[15px] px-[5px]" style={{ fontFamily: "Roboto", color: "#DBDBDB", fontWeight: "bold" }}>|</Text></Column>


                                        <Column className="w-0 pr-[100px]" align="center">
                                            <Link href="https://allcapz.in/">
                                                <Img src="https://images2.imgbox.com/48/6c/qrdd3fab_o.png" width={100} height={100} sizes='100vw' className='w-auto h-[10px]' />
                                            </Link>
                                        </Column>
                                    </Row>

                                    <Row>
                                        <Column align="center"><Img src="https://images2.imgbox.com/b8/ee/ilXNeOra_o.png" width={100} height={100} sizes='100vw' className='w-auto h-[8px]' /></Column>
                                    </Row>
                                </Column>
                            </Row>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>

    );
}
