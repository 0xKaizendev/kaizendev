import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type ContactFormEmailProps = {
  team: string;
  message: string;
  senderEmail: string;
};

export default function ContactFormEmail({
  team,
  message,
  senderEmail,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>hire() from {team || senderEmail}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container>
            <Section className="borderBlack my-10 rounded-md bg-white px-10 py-4">
              <Heading className="leading-tight">
                Someone called hire() on kaizendev.me
              </Heading>
              <Text>Team: {team || "not given"}</Text>
              <Text>Reply to: {senderEmail}</Text>
              <Hr />
              <Text className="whitespace-pre-wrap">{message}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
