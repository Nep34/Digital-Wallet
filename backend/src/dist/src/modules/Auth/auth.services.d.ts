declare const loginService: (email: string, password: string) => Promise<{
    user: {
        id: string;
        name: string | null;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    };
    token: string;
}>;
declare const registerService: (name: string, email: string, password: string) => Promise<{
    user: {
        id: string;
        name: string | null;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    };
    token: string;
}>;
export { loginService, registerService };
//# sourceMappingURL=auth.services.d.ts.map