export const calculateNights = (checkin: string, checkout: string): number => {
  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);
  const diffTime = checkoutDate.getTime() - checkinDate.getTime();
  const nights = diffTime / (1000 * 60 * 60 * 24); // ms → days
  return Math.ceil(nights); // Round up just in case of partial day
};
