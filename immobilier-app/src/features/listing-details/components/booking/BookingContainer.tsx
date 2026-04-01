import { Property } from "@/types/property";
import { BookingForm } from "./BookingForm";
import { ContactForm } from "./ContactForm";

interface BookingContainerProps {
  property: Property;
}

export const BookingContainer = ({ property }: BookingContainerProps) => {
  const isShortTermRental = property.typeTransaction.value === "rent-short";

  return (
    <div className="sticky top-24">
      {isShortTermRental ? (
        <BookingForm property={property} />
      ) : (
        <ContactForm property={property} />
      )}
    </div>
  );
};
