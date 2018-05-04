export class User {
    id: number;
    username: string;
    password: string|undefined;
    passwordHash: string|undefined;
    email: string;
}