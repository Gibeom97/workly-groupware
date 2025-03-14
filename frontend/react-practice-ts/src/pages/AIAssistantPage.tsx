import AIAssistant from '../components/AI/AIAssistant';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

const AIAssistantPage = () => {
    return (
        <div style={styles.mainpageContainer}>
            <Sidebar />
            <div style={styles.componentContainer}>
                <Header />
                <div style={styles.scrollContainer}>
                    <AIAssistant/>
                </div>
            </div>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    mainpageContainer: {
        display: "flex",
        height: "100vh", // 전체 화면 높이로 설정
        overflow: "hidden",
    },
    componentContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
    },
    scrollContainer: {
        flex: 1,
        overflowY: "auto", // ✅ 스크롤바 활성화
        maxHeight: "calc(100vh - 60px)", // ✅ 60px는 Header 높이 고려 (조절 가능)
        padding: "10px",
    },
};


export default AIAssistantPage;