import { createContext, useContext, useState, ReactNode, Children } from "react";

interface ChatContextType {
    isChatOpen : boolean;
    openChat : () => void;
    closeChat : () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({children}:{children :ReactNode}) => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const openChat = () => setIsChatOpen(true);
    const closeChat = () => setIsChatOpen(false);

    return(
        <ChatContext.Provider value={{isChatOpen, openChat, closeChat}}>
            {children}
        </ChatContext.Provider>
    );

};

export const useChat = () => {
    const context = useContext(ChatContext);
    if(!context){
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
}