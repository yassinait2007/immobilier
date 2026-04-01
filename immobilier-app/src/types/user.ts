import { Address } from "./Address";

type UserType = "client" | "host"; // add more types if needed

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  tel: string | null;
  type: UserType;
  profile: string;
  address: Address | null;
  accessToken: string;
}
