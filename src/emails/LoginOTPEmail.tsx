// IMPORTS
import { Html, Head, Font, Preview, Heading, Row, Section, Text } from '@react-email/components';

// LOGIN OTP EMAIL
const LoginOTPEmail = (OTP: number) => {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>Verification Code</title>
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Verdana"
                    webFont={{
                    url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
                    format: 'woff2',
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>
            <Preview>Here&apos;s your verification code: {OTP.toString()}</Preview>
            <Section>
                <Row>
                    <Heading as="h2">Hello user,</Heading>
                </Row>
                <Row>
                    <Text>Please use the following verification code to sign in:</Text>
                </Row>
                <Row>
                    <Text>{OTP}</Text> 
                </Row>
                <Row>
                    <Text>If you did not request this code, please ignore this email.</Text>
                </Row>
            </Section>
        </Html>
    );
};

export default LoginOTPEmail;