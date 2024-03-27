import FlexContainer from "./FlexContainer";

type ResponsivePageContainerProps = {
    children: React.ReactNode
}

export default function ResponsivePageContainer({ children }: ResponsivePageContainerProps){
    return(
        <FlexContainer direction='column' className='w-full md:max-w-[80rem] mx-auto h-full overflow-y-auto overflow-x-hidden'>
            {children}
        </FlexContainer>
    )
}