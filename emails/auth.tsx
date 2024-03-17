import React from 'react';
import { Html, Head, Body, Preview, Container, Tailwind, Section, Row, Column, Link, Text, Img } from '@react-email/components';

export function LoginRequest(name: string, authLink: string) {
    return (
        <Html>
            <Head />
            <Preview>Hey, Here&apos;s the link to Log in to ALLCAPZ.IN</Preview>
            <Tailwind>
                <Body className="bg-black my-auto mx-auto">
                    <Container className="bg-[url('https://graph.org/file/51d9569396ec7b92137a7.jpg')] bg-cover my-[40px] mx-auto p-[30px] max-w-[600px]">
                        <Section>
                            <Row>
                                <Column align='left'><Img src="https://graph.org/file/c118dc35629e21153f8e1.png" width={120} />
                                </Column>

                                <Column align='right'><Img src="https://graph.org/file/ff5dbeeb3d1bbbcbe0af3.png" width={120} /></Column>
                            </Row>
                        </Section>


                        <Section className="text-center mt-12">
                            <Row className="mb-[-15px]">
                                <Column align='center'>
                                    <Img src="https://images2.imgbox.com/c9/2b/cOUbcUF6_o.png" width={100} height={100} sizes='100vw' className='w-auto h-[16px]' />
                                </Column>
                            </Row>

                            <Row>
                                <Column align="center" className="px-[10px]">
                                    <Text className="text-accent text-[20px]" style={{ fontFamily: "Roboto", color: "#DBDBDB", fontWeight: "bold" }}>{name}.</Text>
                                </Column>
                            </Row>
                        </Section>

                        <Section className="mt-2">
                            <Row>
                                <Column align="center">
                                    <Link href={authLink}><Img src="https://graph.org/file/4d62d12b75157a936bdbb.png" width={130} /></Link>
                                    <Img src="https://images2.imgbox.com/ec/0b/PfbxZXWe_o.png" width={250} className="mt-2" />
                                    <Img src="https://images2.imgbox.com/3d/36/7dq78U7R_o.png" width={200} className="mt-1" />
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

export function SignupRequest(email: string, authLink: string) {
    return (
        <Html>
            <Head />
            <Preview>Hey, Here&apos;s the link to Sign up to ALLCAPZ.IN</Preview>
            <Tailwind>
                <Body className="bg-black my-auto mx-auto">
                    <Container className="bg-[url('https://graph.org/file/51d9569396ec7b92137a7.jpg')] bg-cover my-[40px] mx-auto p-[30px] max-w-[600px]">
                        <Section>
                            <Row>
                                <Column align='left'><Img src="https://graph.org/file/c118dc35629e21153f8e1.png" width={120} />
                                </Column>

                                <Column align='right'><Img src="https://images2.imgbox.com/08/46/JdtHfiiY_o.png" width={120} /></Column>
                            </Row>
                        </Section>


                        <Section className="text-center mt-12">
                            <Row className="mb-[-15px]">
                                <Column align='center'>
                                    <Img src="https://images2.imgbox.com/59/c3/7Mr2Gj4C_o.png" width={100} height={100} sizes='100vw' className='w-auto h-[16px]' />
                                </Column>
                            </Row>

                            <Row>
                                <Column align="center" className="px-[10px]">
                                    <Text className="text-accent text-[20px]" style={{ fontFamily: "Roboto", color: "#DBDBDB", fontWeight: "bold" }}>{email}.</Text>
                                </Column>
                            </Row>
                        </Section>

                        <Section className="mt-2">
                            <Row>
                                <Column align="center">
                                    <Link href={authLink}><Img src="https://graph.org/file/4d62d12b75157a936bdbb.png" width={130} /></Link>
                                    <Img src="https://images2.imgbox.com/ec/0b/PfbxZXWe_o.png" width={250} className="mt-2" />
                                    <Img src="https://images2.imgbox.com/3d/36/7dq78U7R_o.png" width={200} className="mt-1" />
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
