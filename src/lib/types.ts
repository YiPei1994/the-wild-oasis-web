import { Session, User } from "next-auth";
import { DateRange } from "react-day-picker";

export type CabinType = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
};

export type Booking = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  guestId: number;
  cabinId: number;
  status: boolean;
  cabins: {
    name: string;
    image: string;
  };
};

export type Country = {
  name: string;
  flag: string;
  independent: boolean;
};

export type Settings = {
  id: number;
  created_at: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
};

export type Range = DateRange | undefined;

export type Guest = {
  id: number;
  created_at: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  nationalID: string;
  nationality: string;
  countryFlag: string;
};

export interface ExtendedUser extends User {
  guestId?: number | undefined;
}
export interface ExtendedSession extends Session {
  user?: ExtendedUser;
}

export type ReservationType = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinId: number;
  guestId: number;
};
