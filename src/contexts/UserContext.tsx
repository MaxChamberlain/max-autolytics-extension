import { createContext, useEffect, useState } from "react";
import { useAuthUser } from "../hooks/Auth";

export const UserContext = createContext({} as any);

type UserContextProviderProps = {
    children: React.ReactNode
}

export function UserContextProvider({ children }: UserContextProviderProps){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const authUser = useAuthUser()
    useEffect(() => {
        setLoading(true)
        authUser().then((data: any) => {
            setUser(data)
        }).finally(() => {
            setLoading(false)
        })
    }, [])
    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    )
}