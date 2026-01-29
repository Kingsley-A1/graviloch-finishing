/**
 * Email Service (Resend)
 * ======================
 * Handles sending contact form submissions and notifications.
 * Uses Resend API for reliable email delivery.
 */

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "contact@graviloch.com";
const FROM_EMAIL = "GRAVILOCH FINISHING <noreply@graviloch.com>";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  productId?: string;
  productName?: string;
}

export interface ReviewNotificationData {
  reviewerName: string;
  rating: number;
  message: string;
  reviewId: string;
}

/**
 * Send contact form submission to business email
 */
export async function sendContactEmail(
  data: ContactFormData
): Promise<{ success: boolean; error?: string; id?: string }> {
  try {
    const { name, email, phone, subject, message, productId, productName } =
      data;

    const emailSubject = productName
      ? `[Product Inquiry] ${productName} - ${name}`
      : subject
        ? `[Contact] ${subject} - ${name}`
        : `[Contact Form] New message from ${name}`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0d0d0d; color: #ffffff; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
            .header { background: linear-gradient(135deg, #10b981 0%, #047857 100%); padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; color: white; }
            .content { padding: 30px; }
            .field { margin-bottom: 20px; }
            .label { font-size: 12px; color: #a3a3a3; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
            .value { font-size: 16px; color: #ffffff; line-height: 1.6; }
            .message-box { background: #262626; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; }
            .product-tag { display: inline-block; background: linear-gradient(135deg, #fbbf24 0%, #b8860b 100%); color: #000; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; }
            .footer { padding: 20px 30px; background: #151515; text-align: center; font-size: 12px; color: #737373; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎨 New Contact Inquiry</h1>
            </div>
            <div class="content">
              ${productName ? `<div class="field"><span class="product-tag">Product Inquiry: ${productName}</span></div>` : ""}
              
              <div class="field">
                <div class="label">From</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}" style="color: #10b981;">${email}</a></div>
              </div>
              
              ${
                phone
                  ? `
              <div class="field">
                <div class="label">Phone</div>
                <div class="value"><a href="tel:${phone}" style="color: #10b981;">${phone}</a></div>
              </div>
              `
                  : ""
              }
              
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">
                  <div class="value">${message.replace(/\n/g, "<br>")}</div>
                </div>
              </div>
              
              ${productId ? `<div class="field"><div class="label">Product ID</div><div class="value" style="font-family: monospace; font-size: 12px;">${productId}</div></div>` : ""}
            </div>
            <div class="footer">
              GRAVILOCH FINISHING - Professional Italian Painting Services<br>
              This email was sent from the website contact form.
            </div>
          </div>
        </body>
      </html>
    `;

    const textContent = `
New Contact Inquiry
==================

From: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ""}
${productName ? `Product: ${productName}` : ""}

Message:
${message}

---
GRAVILOCH FINISHING - Professional Italian Painting Services
    `.trim();

    const { data: result, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: emailSubject,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: result?.id };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

/**
 * Send notification when a new review is submitted
 */
export async function sendReviewNotification(
  data: ReviewNotificationData
): Promise<{ success: boolean; error?: string }> {
  try {
    const { reviewerName, rating, message, reviewId } = data;
    const stars = "⭐".repeat(rating);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0d0d0d; color: #ffffff; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
            .header { background: linear-gradient(135deg, #fbbf24 0%, #b8860b 100%); padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; color: #000; }
            .content { padding: 30px; }
            .rating { font-size: 32px; text-align: center; margin: 20px 0; }
            .reviewer { text-align: center; font-size: 18px; color: #10b981; margin-bottom: 20px; }
            .message-box { background: #262626; padding: 20px; border-radius: 8px; }
            .cta { text-align: center; margin-top: 30px; }
            .cta a { display: inline-block; background: linear-gradient(135deg, #10b981 0%, #047857 100%); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
            .footer { padding: 20px 30px; background: #151515; text-align: center; font-size: 12px; color: #737373; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📝 New Review Submitted</h1>
            </div>
            <div class="content">
              <div class="rating">${stars}</div>
              <div class="reviewer">From: ${reviewerName}</div>
              <div class="message-box">${message.replace(/\n/g, "<br>")}</div>
              <div class="cta">
                <a href="${process.env.NEXTAUTH_URL}/admin/reviews">Review & Approve</a>
              </div>
            </div>
            <div class="footer">
              Review ID: ${reviewId}<br>
              This review requires approval before being published.
            </div>
          </div>
        </body>
      </html>
    `;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [CONTACT_EMAIL],
      subject: `[New Review] ${rating}★ from ${reviewerName}`,
      html: htmlContent,
    });

    if (error) {
      console.error("Review notification error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Review notification error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to send notification",
    };
  }
}

/**
 * Send auto-reply to customer after contact form submission
 */
export async function sendAutoReply(
  customerEmail: string,
  customerName: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0d0d0d; color: #ffffff; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #1a1a1a; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
            .header { background: linear-gradient(135deg, #10b981 0%, #047857 100%); padding: 40px 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; color: white; }
            .header p { margin: 10px 0 0; color: rgba(255,255,255,0.9); }
            .content { padding: 30px; line-height: 1.8; }
            .highlight { color: #10b981; font-weight: 600; }
            .cta { text-align: center; margin: 30px 0; }
            .cta a { display: inline-block; background: linear-gradient(135deg, #fbbf24 0%, #b8860b 100%); color: #000; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; margin: 0 10px; }
            .footer { padding: 20px 30px; background: #151515; text-align: center; font-size: 12px; color: #737373; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You, ${customerName}! 🎨</h1>
              <p>We've received your message</p>
            </div>
            <div class="content">
              <p>Thank you for reaching out to <span class="highlight">GRAVILOCH FINISHING</span>!</p>
              <p>We specialize in premium Italian painting finishes that transform ordinary spaces into extraordinary works of art. Our team of expert craftsmen are dedicated to delivering the finest quality in:</p>
              <ul>
                <li>Venetian Plaster</li>
                <li>Marmorino</li>
                <li>Travertino</li>
                <li>Metallic & Liquid Metal Finishes</li>
              </ul>
              <p>One of our representatives will get back to you within <span class="highlight">24 hours</span>.</p>
              <p>In the meantime, feel free to explore our gallery or connect with us directly on WhatsApp for immediate assistance.</p>
              <div class="cta">
                <a href="${process.env.NEXTAUTH_URL}/gallery">View Gallery</a>
                <a href="https://wa.me/${process.env.WHATSAPP_NUMBER?.replace(/[^0-9]/g, "")}">WhatsApp Us</a>
              </div>
            </div>
            <div class="footer">
              GRAVILOCH FINISHING<br>
              Professional Italian Painting Services<br>
              <a href="${process.env.NEXTAUTH_URL}" style="color: #10b981;">www.graviloch.com</a>
            </div>
          </div>
        </body>
      </html>
    `;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [customerEmail],
      subject: "Thank you for contacting GRAVILOCH FINISHING! 🎨",
      html: htmlContent,
    });

    if (error) {
      console.error("Auto-reply error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Auto-reply error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to send auto-reply",
    };
  }
}

export { resend };
