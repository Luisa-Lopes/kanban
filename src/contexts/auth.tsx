import { createContext, useState, useEffect, ReactNode } from "react";

interface User {
    email: string;
    password: string;
}

interface AuthContextType {
    user: User | null;
    signed: boolean;
    signin: (email: string, password: string) => string | void;
    signup: (email: string, password: string) => string | void;
    signout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    signed: false,
    signin: () => {},
    signup: () => {},
    signout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userToken = localStorage.getItem("user_token");
        const usersStorage = localStorage.getItem("users_bd");

        if (userToken && usersStorage) {
            const parsedToken = JSON.parse(userToken);
            const parsedUsers: User[] = JSON.parse(usersStorage);

            const hasUser = parsedUsers?.find(
                (u) => u.email === parsedToken.email
            );

            if (hasUser) setUser(hasUser);
        }
    }, []);

    const signin = (email: string, password: string): string | void => {
        const usersStorage = JSON.parse(
            localStorage.getItem("users_bd") || "[]"
        ) as User[];

        const hasUser = usersStorage.find((user) => user.email === email);

        if (hasUser) {
            if (hasUser.password === password) {
                const token = Math.random().toString(36).substring(2);
                localStorage.setItem(
                    "user_token",
                    JSON.stringify({ email, token })
                );
                setUser({ email, password });
                return;
            } else {
                return "E-mail ou senha incorretos";
            }
        } else {
            return "Usuário não cadastrado";
        }
    };

    const signup = (email: string, password: string): string | void => {
        const usersStorage = JSON.parse(
            localStorage.getItem("users_bd") || "[]"
        ) as User[];

        if (usersStorage.some((user) => user.email === email)) {
            return "Já tem uma conta com esse E-mail";
        }

        const newUser = [...usersStorage, { email, password }];

        localStorage.setItem("users_bd", JSON.stringify(newUser));
    };

    const signout = () => {
        setUser(null);
        localStorage.removeItem("user_token");
    };

    return (
        <AuthContext.Provider
            value={{ user, signed: !!user, signin, signup, signout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
