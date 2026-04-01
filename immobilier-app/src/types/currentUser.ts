import { Address } from "./Address";

type UserType = "client" | "host";
type IdentityStatus = "pending" | "valid" | "invalid";

export interface CurrentUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  type: UserType;
  profile: string;
  isEmailVerified: boolean;
  address: Address;
  identityStatus: IdentityStatus;
}
