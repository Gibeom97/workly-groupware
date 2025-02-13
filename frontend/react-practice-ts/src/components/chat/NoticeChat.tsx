import speaker from "../../assets/Images/chat/loud-speaker 11.png";
import profile from "../../assets/Images/chat/profile.png";
import bell from "../../assets/Images/chat/bell.png";
import personplus from "../../assets/Images/chat/personPlus.png";
import exit from "../../assets/Images/chat/exit.png";

interface NoticeChatProps {
    onClose : () => void;
}

const NoticeChat = ({onClose} : NoticeChatProps) => {
    return (
        <div className="noticechat-container" style={{
          width: 390,
          height: 600,
          position: 'relative'
        }}>
          <div className="noticechat-background" style={{
            width: 390,
            height: 600,
            position: 'absolute',
            background: 'white',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: 5
          }} />

          <div className="noticechat-close-icon" style={{
            left: 359,
            top: 22,
            position: 'absolute',
            cursor: "pointer"
          }} onClick={onClose} >
            ✕
          </div>

          <img className="speaker1" style={{
            width: 30,
            height: 30,
            left: 185,
            top: 20,
            position: 'absolute'
          }} src={speaker} alt="icon" />

          <div className="noticechat-title" style={{
            left: 85,
            top: 26,
            position: 'absolute',
            color: 'black',
            fontSize: 16,
            fontFamily: 'Nunito Sans',
            fontWeight: '700'
          }}>
            사내공지 톡방
          </div>

          <div
            className="noticechat-avatar"
            style={{
                width: 40,
                height: 40,
                left: 28,
                top: 21,
                position: 'absolute',
                background: '#D9D9D9',
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
            <img
                className="profile1"
                style={{
                width: '22px',
                height: '22px',
                objectFit: 'cover',
                }}
                src={profile}
                alt="profile"
            />
          </div>

          <div className="noticechat-content-group" style={{
            position: 'absolute',
            top: '100px',
            left: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '350px'
          }}>
            <div
              className="dividerDate"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '15px',
                width: '100%'
              }}
            >
              <div className="left-divider" style={{ flex: 1, height: '1px', background: '#E0E0E0' }} />
              <div className="noticechat-date" style={{ margin: '0 10px', color: '#4880FF', fontSize: '11px', fontFamily: 'Roboto', fontWeight: '500', lineHeight: '5px', letterSpacing: '0.5px', whiteSpace: 'nowrap', width: 'auto' }}>2025년 2월 6일 목요일</div>
              <div className="right-divider" style={{ flex: 1, height: '1px', background: '#E0E0E0' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{
                width: 40,
                height: 40,
                background: '#D9D9D9',
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <img className="admin" style={{ width: '22px', height: '22px', objectFit: 'cover' }} src={profile} alt="profile" />
              </div>
              <div>
                <div style={{ fontFamily: 'Nunito Sans', fontWeight: '700', fontSize: '14px', color: 'black', paddingBottom:'7px'}}>관리자</div>
                <div style={{
                  background: '#E9EBF1',
                  padding: '10px',
                  borderRadius: '5px',
                  fontSize: '14px',
                  fontFamily: 'Roboto',
                  fontWeight: '600',
                  color: '#4880FF',
                  lineHeight: '20px',
                  letterSpacing: '0.1px'
                }}>
                  !!!필독!!!<br />내일 엘리베이터 공사로 인해 <br />9:00 ~ 13:00 까지 <br />엘리베이터 사용이 중지됩니다.<br />참고하시길 바랍니다.
                </div>
                <div style={{ fontSize: '11px', fontFamily: 'Roboto', fontWeight: '500', color: '#B3B3B3', paddingTop:'5px'}}>25년 2월 6일 오후 3:42 공지</div>
              </div>
            </div>
          </div>

          <img className="bell" style={{ width: 30, height: 30, left: 31, top: 545, position: 'absolute' }} src={bell} alt="icon" />
          <img className="personplus" style={{ width: 30, height: 30, left: 81, top: 545, position: 'absolute' }} src={personplus} alt="icon" />
          <img className="exit" style={{ width: 30, height: 30, left: 131, top: 545, position: 'absolute' }} src={exit} alt="icon" />
        </div>
      );
    }

export default NoticeChat;
