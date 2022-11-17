export interface TokenPayload {
    id: string,
    name: string,
    email?: string,
    exp: number,
}