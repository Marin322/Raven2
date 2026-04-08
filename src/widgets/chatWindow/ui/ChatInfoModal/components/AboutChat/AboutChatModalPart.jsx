import { useEffect } from "react";
import { useChatStore } from "../../../../../../entitites/chat/model/useChatStore"
import { AboutChatMemberItem } from "./components/AboutChatMemberItem";
export const AboutChatModalPart = ({chatId}) => {
    const { fetchChatDetails, activeChatDetails, isDetailsLoading } = useChatStore();

    useEffect(() => {
        if (chatId) {
            fetchChatDetails(chatId);
        }
    }, [chatId, fetchChatDetails]);

    if (isDetailsLoading) {
        return <div>Загрузка участников</div>
    };

    if (!activeChatDetails) return null;

    return (
        <div className="w-full border-t-2 border-b-2 border-border-bg p-2 gap-2 flex flex-col">
            {activeChatDetails.members.map((member) => (
                <AboutChatMemberItem key={member.userId} name={member.fullName} username={member.username} isOnline={member.isOnline}/>
            ))}
        </div>
    )
}