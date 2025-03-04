import AIAssistant from '../components/AI/AIAssistant';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

const AIAssistantPage = () => {
    return (
        <div className="mainpageContainer">
            <Sidebar />
            <div className="componentContainer">
                <Header />
                <div>
                    <AIAssistant/>
                </div>
            </div>
        </div>
    )
}

export default AIAssistantPage;