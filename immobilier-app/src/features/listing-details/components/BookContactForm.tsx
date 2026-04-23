"use client";

import { Property } from "@/types/property";
import { BookingForm } from "./booking/BookingForm";
import { ContactForm } from "./booking/ContactForm";

export const BookContactForm = ({ property }: { property: Property }) => {
  if (property.typeTransaction.value === "rent-short" || property.typeTransaction.value === "vacation_rental") {
    return <BookingForm property={property} />;
  } else {
    return <ContactForm property={property} />;
  }
};
