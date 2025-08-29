import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppWidget = () => {
  const handleWhatsAppClick = () => {
    // WhatsApp Business number - replace with actual number
    const phoneNumber = "1234567890";
    const message = "Hi! I'm interested in your digital services. Can you help me?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" data-testid="whatsapp-widget">
      <Button
        onClick={handleWhatsAppClick}
        className="gradient-gold text-background w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 p-0"
        size="icon"
        aria-label="Contact us on WhatsApp"
        data-testid="whatsapp-button"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default WhatsAppWidget;
