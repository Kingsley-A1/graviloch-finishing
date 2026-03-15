import {
  generateWhatsAppUrl,
  generateProductInquiryUrl,
  generateContactFormUrl,
  generateGalleryInquiryUrl,
  getWhatsAppShareUrl,
  getPhoneUrl,
  WHATSAPP_NUMBER,
} from "./whatsapp";

// The env var might be empty in tests depending on setup, but the file defaults to "+2349036826272".
const expectedBaseUrl = `https://wa.me/2349036826272`;

describe("whatsapp utility", () => {
  it("should generate a base WhatsApp URL without a message", () => {
    const url = generateWhatsAppUrl();
    expect(url).toBe(expectedBaseUrl);
  });

  it("should generate a WhatsApp URL with an encoded message", () => {
    const url = generateWhatsAppUrl("Hello world!");
    expect(url).toBe(`${expectedBaseUrl}?text=Hello%20world!`);
  });

  describe("generateProductInquiryUrl", () => {
    it("should format a product inquiry message correctly without price and ID", () => {
      const url = generateProductInquiryUrl("Venetian Plaster");
      expect(url).toContain("Venetian%20Plaster");
      expect(url).toContain("Availability");
    });

    it("should format a product inquiry message correctly with price and ID", () => {
      const url = generateProductInquiryUrl("Stucco", "PROD-123", 50000);
      expect(url).toContain("Stucco");
      expect(url).toContain("PROD-123");
      expect(url).toContain("50%2C000"); // 50,000 encoded
    });
  });

  describe("generateContactFormUrl", () => {
    it("should format a contact form message correctly with all fields", () => {
      const url = generateContactFormUrl({
        name: "John Doe",
        email: "john@example.com",
        phone: "08012345678",
        message: "I need a quote for a 5-bedroom duplex.",
      });

      expect(url).toContain(encodeURIComponent("John Doe"));
      expect(url).toContain(encodeURIComponent("john@example.com"));
      expect(url).toContain(encodeURIComponent("08012345678"));
      expect(url).toContain(encodeURIComponent("5-bedroom duplex"));
    });

    it("should format a contact form message correctly missing optional fields", () => {
      const url = generateContactFormUrl({
        name: "Jane Smith",
        message: "Just saying hi",
      });

      expect(url).toContain(encodeURIComponent("Jane Smith"));
      expect(url).toContain(encodeURIComponent("Just saying hi"));
      expect(url).not.toContain(encodeURIComponent("Email:"));
    });
  });

  describe("generateGalleryInquiryUrl", () => {
    it("should format a gallery inquiry correctly", () => {
      const url = generateGalleryInquiryUrl("Luxury Living Room", "interior");
      expect(url).toContain(encodeURIComponent("Luxury Living Room"));
      expect(url).toContain(encodeURIComponent("interior"));
      expect(url).toContain("Pricing%20estimates");
    });
  });

  describe("getWhatsAppShareUrl", () => {
    it("should generate a share intent URL", () => {
      const url = getWhatsAppShareUrl(
        "Check this out",
        "https://graviloch.com",
        "A cool finish"
      );
      
      // Share URL is slightly different base (wa.me/?)
      expect(url).toContain("https://wa.me/?text=");
      expect(url).toContain(encodeURIComponent("Check this out"));
      expect(url).toContain(encodeURIComponent("A cool finish"));
      expect(url).toContain(encodeURIComponent("https://graviloch.com"));
    });
  });

  describe("getPhoneUrl", () => {
    it("should return the correct tel: string", () => {
      const url = getPhoneUrl();
      expect(url).toBe(`tel:${WHATSAPP_NUMBER}`);
    });
  });
});
