import {
  Body,
  Container,
  Heading,
  Section,
  Button,
  Img,
  Text,
  Html,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface ContactFormEmailProps {
  email: string;
  url: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;

const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({ email, url }) => (
  <Html lang="en">
    <Tailwind
      config={{
        fontFamily: {
          Lemon: ["Lemon"],
        },
      }}
    >
      <Body className="px-2 mx-auto my-auto font-sans bg-white">
        <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">

          <Section className="mt-[32px]">
            <Img
              src="https://res.cloudinary.com/dos8mey8r/image/upload/v1705394086/electro/logo11_l1u82h.png"
              width="40"
              height="37"
              alt="Vercel"
              className="mx-auto my-0"
            />
          </Section>

          <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
            Verify your account on <strong>ElectroStore</strong>
          </Heading>

          <Text>
            Click on the button to verify email and complete your registration
          </Text>

          <Section className="text-center mt-[32px] mb-[32px]">
            <Button
              className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
              href={url}
            >
              Join us
            </Button>
          </Section>
          {/**
 
          <Text className="text-black text-[14px] leading-[24px] max-w-[450px]">
              or copy and paste this URL into your browser:{" "}
              <Link href={url} className="text-blue-600 no-underline">
                {url}
              </Link>
            </Text>
 */}

        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default ContactFormEmail;
