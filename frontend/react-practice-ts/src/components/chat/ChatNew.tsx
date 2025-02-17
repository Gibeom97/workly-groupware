import chatPlus from "../../assets/Images/chat/chatplus.png";


const ChatNew = () => {
    return(
        <>
            <div className="chatnew" style={{
        width: 276,
        height: 131,
        position: 'relative',
        }}>
        <div className="chatnew-header" style={{
            width: 117,
            height: 18,
            paddingRight: 7.58,
            left: 0,
            top: 5,
            position: 'absolute',
            justifyContent: 'flex-start',
            alignItems: 'center',
            display: 'inline-flex',
        }}>
            <div className="chatnew-title" style={{
            width: 109.42,
            color: '#4880FF',
            fontSize: 24,
            fontFamily: 'Nunito Sans',
            fontWeight: '800',
            wordWrap: 'break-word',
            }}>
            Chatting
            </div>
        </div>

        <img className="chatnew-icon" style={{
            width: 30,
            height: 30,
            left: 246,
            top: 0,
            position: 'absolute',
        }} src={chatPlus} alt="icon" />

        <div className="chatnew-message" style={{
            left: 3,
            top: 61,
            position: 'absolute',
            color: '#202224',
            fontSize: 16,
            fontFamily: 'Inter',
            fontWeight: '600',
            lineHeight: '22.4px',
            wordWrap: 'break-word',
        }}>
            존재하는 채팅방이 없습니다.
        </div>

        <div className="chatnew-create-wrapper" style={{
            width: 190,
            height: 31,
            left: 3,
            top: 100,
            position: 'absolute',
        }}>
            <div className="chatnew-create-background" style={{
            width: 190,
            height: 31,
            left: 0,
            top: 0,
            position: 'absolute',
            background: '#E9EBF1',
            borderRadius: 5,
            }} />

            <div className="chatnew-create-text" style={{
            left: 40,
            top: 8,
            position: 'absolute',
            color: '#202224',
            fontSize: 12,
            fontFamily: 'Roboto',
            fontWeight: '500',
            lineHeight: '16px',
            letterSpacing: '0.5px',
            wordWrap: 'break-word',
            }}>
            새로운 채팅방 만들기
            </div>
        </div>
        </div>

                
        </>
    )
    }
    export default ChatNew