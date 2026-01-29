/**
 * Contact API
 * ===========
 * Handle contact form submissions.
 * Supports email and WhatsApp redirect.
 */

import { NextRequest, NextResponse } from "next/server";
import { ContactFormSchema } from "@/types";
import { sendContactEmail, sendAutoReply } from "@/lib/email";
import { generateContactFormUrl, generateProductInquiryUrl } from "@/lib/whatsapp";
import { trackEvent, getClientInfo } from "@/lib/analytics";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = ContactFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message, productId, productName, sendVia } =
      validation.data;

    const response: {
      success: boolean;
      message: string;
      whatsappUrl?: string;
      emailSent?: boolean;
    } = {
      success: true,
      message: "Contact form processed successfully",
    };

    // Get client info for analytics
    const clientInfo = getClientInfo(request);

    // Track the contact event
    trackEvent("contact_form", "/contact", {
      productId,
      metadata: { sendVia },
      ...clientInfo,
    });

    // Handle email sending
    if (sendVia === "email" || sendVia === "both") {
      const emailResult = await sendContactEmail({
        name,
        email,
        phone,
        subject,
        message,
        productId,
        productName,
      });

      response.emailSent = emailResult.success;

      if (emailResult.success) {
        // Send auto-reply to customer (fire and forget)
        sendAutoReply(email, name).catch((err) =>
          console.error("Auto-reply failed:", err)
        );
      }

      if (!emailResult.success && sendVia === "email") {
        return NextResponse.json(
          {
            success: false,
            error: "Failed to send email. Please try again or use WhatsApp.",
          },
          { status: 500 }
        );
      }
    }

    // Generate WhatsApp URL
    if (sendVia === "whatsapp" || sendVia === "both") {
      trackEvent("whatsapp_click", "/contact", {
        productId,
        ...clientInfo,
      });

      if (productName && productId) {
        // If it's a product inquiry
        const product = await prisma.product.findUnique({
          where: { id: productId },
          select: { price: true },
        });

        response.whatsappUrl = generateProductInquiryUrl(
          productName,
          productId,
          product?.price
        );
      } else {
        // General contact form
        response.whatsappUrl = generateContactFormUrl({
          name,
          email,
          phone,
          message,
        });
      }

      response.message =
        sendVia === "whatsapp"
          ? "Opening WhatsApp..."
          : "Email sent! Opening WhatsApp...";
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Contact POST error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process contact form" },
      { status: 500 }
    );
  }
}
