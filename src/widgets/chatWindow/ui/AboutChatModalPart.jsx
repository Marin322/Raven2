import { useEffect } from "react";
import { useChatStore } from "../../../entitites/chat/model/useChatStore"
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
        <div>
            {activeChatDetails.members.map((member) => (
                <div key={member.userId}>
                    {member.fullName}
                </div>
            ))}
        </div>
    )
}