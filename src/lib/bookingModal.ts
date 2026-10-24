export const OPEN_BOOKING_EVENT = "open-booking-modal";

export function openBookingModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_BOOKING_EVENT));
  }
}
