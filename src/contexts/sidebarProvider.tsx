import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextProps {
    openSidebar: boolean;
    setOpenSidebar: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
    undefined
);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <SidebarContext.Provider value={{ openSidebar, setOpenSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error(
            "useSidebar deve ser usado dentro de um SidebarProvider"
        );
    }
    return context;
};
