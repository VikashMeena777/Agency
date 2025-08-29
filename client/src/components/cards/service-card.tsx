import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check } from "lucide-react";
import type { Service } from "@shared/schema";

interface ServiceCardProps {
  service: Service;
  onBook?: (serviceId: string) => void;
}

const ServiceCard = ({ service, onBook }: ServiceCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price / 100);
  };

  return (
    <Card 
      className="glass-card rounded-xl hover-glow hover:scale-105 transition-all duration-300 overflow-hidden group"
      data-testid={`service-card-${service.id}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          data-testid={`service-image-${service.id}`}
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
            {service.category}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 
          className="text-2xl font-playfair font-semibold mb-3"
          data-testid={`service-title-${service.id}`}
        >
          {service.title}
        </h3>
        <p 
          className="text-muted-foreground mb-4"
          data-testid={`service-description-${service.id}`}
        >
          {service.description}
        </p>
        
        {service.features && service.features.length > 0 && (
          <div className="space-y-2 mb-4">
            {service.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center text-sm">
                <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <div>
          <span 
            className="text-primary font-bold text-2xl"
            data-testid={`service-price-${service.id}`}
          >
            Starting at {formatPrice(service.price)}
          </span>
        </div>
        <Button
          onClick={() => onBook?.(service.id)}
          className="gradient-gold text-background hover:scale-105 transition-transform duration-300"
          data-testid={`service-book-button-${service.id}`}
        >
          Book Now
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
