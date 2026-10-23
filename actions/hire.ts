"use server";

import React from "react";
import { Resend } from "resend";
import { z } from "zod";
import ContactFormEmail from "@/components/emails/contact-form-email";
import { getErrorMessage } from "@/lib/utils";

const HireCall = z.object({
  team: z.string().trim().max(120, "team is longer than 120 characters").default(""),
  replyTo: z
    .string({ required_error: "replyTo is missing" })
    .trim()
    .email("replyTo isn't a valid email address")
    .max(320, "replyTo is longer than 320 characters"),
  message: z
    .string({ required_error: "message is missing" })
    .trim()
    .min(1, "message is empty")
    .max(5000, "message is longer than 5,000 characters"),
});

export type HireField = keyof z.infer<typeof HireCall>;

export type HireResult =
  | { ok: true; id: string | null }
  | { ok: false; error: string; field?: HireField };

/** hire(string team, string replyTo, string message): the contact form, sent as an email through Resend. */
export async function hire(formData: FormData): Promise<HireResult> {
  // people never see this field; bots fill every field they find
  if (formData.get("website")) return { ok: true, id: null };

  const field = (name: string) => {
    const value = formData.get(name);
    return typeof value === "string" ? value : undefined;
  };
  const parsed = HireCall.safeParse({ team: field("team"), replyTo: field("replyTo"), message: field("message") });
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: issue.message, field: issue.path[0] as HireField };
  }
  const { team, replyTo, message } = parsed.data;

  if (!process.env.RESEND_API_KEY) {
    return { ok: false, error: "the contact form isn't configured on this server (RESEND_API_KEY)" };
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // Resend reports failures in `error` rather than throwing
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["admin@kaizendev.me"],
      subject: `hire() from ${team || replyTo} | PORTFOLIO`,
      replyTo,
      react: React.createElement(ContactFormEmail, { team, message, senderEmail: replyTo }),
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true, id: data?.id ?? null };
  } catch (error: unknown) {
    return { ok: false, error: getErrorMessage(error) };
  }
}
