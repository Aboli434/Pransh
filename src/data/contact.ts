export interface ContactData {
  phone: string;
  email: string;
  whatsapp?: string;
  address?: string;
}

export const contactData: ContactData = {
  // Temporary placeholders. Must be replaced with real client data before launch.
  phone: "[PHONE NUMBER]",
  email: "[EMAIL ADDRESS]",
  // whatsapp: "[WHATSAPP NUMBER]", // Uncomment and add real number if client wants WhatsApp
};
