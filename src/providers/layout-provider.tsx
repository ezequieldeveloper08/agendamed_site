'use client'

import { IUser } from "@/types/user";
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { toast } from "sonner";

export interface LayoutContextProps {
    loading: boolean;
    showLoading(): void;
    showMenu: boolean;
    hiddenLoading(): void;
    handleError(message: string): void;
    handleSuccess(message: string): void;
    user?: IUser;
}

export const LayoutContext = createContext({} as LayoutContextProps);

export function LayoutProvider({ children, user }: { user?: IUser, children: ReactNode }) {
    const [show, setShow] = useState(true);
    const [loading, setLoading] = useState(false);

    function showLoading() {
        setLoading(true);
    }

    function hiddenLoading() {
        setLoading(false);
    }

    function handleError(message: string) {
        toast.error(message);
    }

    function handleSuccess(message: string) {
        toast(message);
    }

    return (
        <LayoutContext.Provider value={{
            loading,
            showMenu: show,
            hiddenLoading,
            showLoading,
            handleError,
            handleSuccess,
            user,
        }}>
            {children}
        </LayoutContext.Provider>
    )
}

export const useLayout = () => useContext(LayoutContext);