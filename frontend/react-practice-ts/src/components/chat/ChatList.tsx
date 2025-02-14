const ChatList = () => {
    return (
      <div
        className="ChatList"
        style={{
          width: 280,
          height: 420,
          position: 'relative',
        }}
      >
        <div
          className="ChatList-IconGroup"
          style={{
            width: 40,
            height: 40,
            left: 0,
            top: 380,
            position: 'absolute',
          }}
        >
          {/* 아이콘들 */}
          {[0, 10, 20].map((left, index) => (
            <div
              key={index}
              className="ChatList-SmallIconGroup"
              style={{
                width: 20,
                height: 21.92,
                left: left,
                top: index % 2 === 0 ? 18.08 : 0,
                position: 'absolute',
              }}
            >
              <div
                className="ChatList-SmallIconBackground"
                style={{
                  width: 20,
                  height: 21.92,
                  left: 0,
                  top: 0,
                  position: 'absolute',
                  background: '#D9D9D9',
                  borderRadius: 10,
                }}
              />
              <img
                className="ChatList-SmallIconImage"
                style={{
                  width: 11,
                  height: 12.05,
                  left: 15.5,
                  top: 3.84,
                  position: 'absolute',
                  transform: 'rotate(180deg)',
                  transformOrigin: 'top left',
                }}
                src="https://placehold.co/11x12"
                alt="icon"
              />
            </div>
          ))}
        </div>
        {/* 사용자 이름 */}
        {['김기밤', '김예삐', '박솜이'].map((name, index) => (
          <div
            key={index}
            className="ChatList-UserName"
            style={{
              left: 58,
              top: 107 + index * 56,
              position: 'absolute',
              color: 'black',
              fontSize: 16,
              fontFamily: 'Inter',
              fontWeight: '600',
              lineHeight: '22.4px',
              wordWrap: 'break-word',
            }}
          >
            {name}
          </div>
        ))}
        {/* 채팅방 이름 */}
        {['사내 공지 톡방', '인사팀 채팅방', '법무팀 채팅방', '재무팀 채팅방'].map((room, index) => (
          <div
            key={index}
            className="ChatList-ChatRoomName"
            style={{
              left: 58,
              top: [59, 225, 391, 278][index],
              position: 'absolute',
              color: index === 0 ? '#4880FF' : 'black',
              fontSize: 16,
              fontFamily: 'Nunito Sans',
              fontWeight: '700',
              wordWrap: 'break-word',
            }}
          >
            {room}
          </div>
        ))}
      </div>
    );
  };
  
  export default ChatList;
  