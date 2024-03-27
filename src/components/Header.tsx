import { useContext } from "react";
import FlexContainer from "./Layout/FlexContainer";
import { UserContext } from "../contexts/UserContext";
import { properText } from "../lib/textUtility";

export default function Header(){
    const { user } = useContext(UserContext)
    return (
        <header className="p-2 bg-background-secondary flex gap-4 h-12">
            <FlexContainer>
                <img src='/logo.svg' className="h-8 w-8 invert" alt="logo" />
                <h1 className="text-lg">Hello{user && ', ' + properText(user.FirstName)}</h1>
            </FlexContainer>
        </header>
    )
}