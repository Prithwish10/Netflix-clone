export interface TokenPayload {
  id: string;
  name: string;
  email?: string;
  isAdmin?: string;
  exp: number;
}
