export interface JwtResponse {
    dataUser: {
        id: string;
        name: string;
        email: string;
        accessToken: string;
        expiresIn: string;
    }
}
