/**
 * WhatsApp Integration
 * ====================
 * Generates WhatsApp URLs for direct customer communication.
 * Supports pre-filled messages for product inquiries and general contact.
 */

const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || "+2349036826272";

/**
 * Clean phone number for WhatsApp URL
 */
function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[^0-9]/g, "");
}

/**
 * Encode message for URL
 */
function encodeMessage(message: string): string {
  return encodeURIComponent(message.trim());
}

/**
 * Generate WhatsApp URL for general inquiry
 */
export function generateWhatsAppUrl(message?: string): string {
  const cleanNumber = cleanPhoneNumber(WHATSAPP_NUMBER);
  const baseUrl = `https://wa.me/${cleanNumber}`;

  if (message) {
    return `${baseUrl}?text=${encodeMessage(message)}`;
  }

  return baseUrl;
}

/**
 * Generate WhatsApp URL for product inquiry
 */
export function generateProductInquiryUrl(
  productName: string,
  productId?: string,
  price?: number
): string {
  const priceText = price ? ` (₦${price.toLocaleString()})` : "";

  const message = `Hello GRAVILOCH FINISHING! 🎨

I'm interested in the following product:

📦 *Product:* ${productName}${priceText}
${productId ? `🏷️ *ID:* ${productId}` : ""}

I would like to know more about:
- Availability
- Delivery options
- Any current promotions

Thank you!`;

  return generateWhatsAppUrl(message);
}

/**
 * Generate WhatsApp URL for contact form
 */
export function generateContactFormUrl(data: {
  name: string;
  email?: string;
  phone?: string;
  message: string;
}): string {
  const { name, email, phone, message } = data;

  const formattedMessage = `Hello GRAVILOCH FINISHING! 🎨

*Contact Form Submission*

👤 *Name:* ${name}
${email ? `📧 *Email:* ${email}` : ""}
${phone ? `📱 *Phone:* ${phone}` : ""}

💬 *Message:*
${message}`;

  return generateWhatsAppUrl(formattedMessage);
}

/**
 * Generate WhatsApp URL for gallery inquiry
 */
export function generateGalleryInquiryUrl(
  imageTitle: string,
  category?: string
): string {
  const message = `Hello GRAVILOCH FINISHING! 🎨

I saw this beautiful work in your gallery and I'm interested:

🖼️ *Project:* ${imageTitle}
${category ? `📁 *Category:* ${category}` : ""}

I'd love to discuss getting a similar finish for my space. Could you please provide more information about:
- Pricing estimates
- Timeline
- Available consultation dates

Thank you!`;

  return generateWhatsAppUrl(message);
}

/**
 * Generate WhatsApp URL for quote request
 */
export function generateQuoteRequestUrl(projectDetails?: string): string {
  const message = `Hello GRAVILOCH FINISHING! 🎨

I'm interested in getting a quote for a painting project.

${projectDetails ? `📋 *Project Details:*\n${projectDetails}` : "Please help me with a quote for my project."}

I'm looking forward to hearing from you!`;

  return generateWhatsAppUrl(message);
}

/**
 * Generate WhatsApp URL for store visit scheduling
 */
export function generateStoreVisitUrl(): string {
  const message = `Hello GRAVILOCH FINISHING! 🎨

I would like to schedule a visit to your Nikkolo Paints store.

Please let me know your:
- Available dates and times
- Store address and directions
- Any items I should prepare before visiting

Thank you!`;

  return generateWhatsAppUrl(message);
}

/**
 * Get WhatsApp share URL for sharing products/gallery
 */
export function getWhatsAppShareUrl(
  title: string,
  url: string,
  description?: string
): string {
  const message = `Check out this amazing work from GRAVILOCH FINISHING! 🎨

${title}
${description ? `\n${description}` : ""}

${url}`;

  return `https://wa.me/?text=${encodeMessage(message)}`;
}

/**
 * Direct dial phone number
 */
export function getPhoneUrl(): string {
  return `tel:${WHATSAPP_NUMBER}`;
}

export { WHATSAPP_NUMBER };
