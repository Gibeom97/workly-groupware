import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import styles from "./MainPage.module.css"

const MainPage = () => {

    return (
        <div className={styles.mainpageContainer}>
            <Sidebar/>
            <div className={styles.componentContainer}>
                <Header/>
                <div>이 태그 지우고 만든 컴포넌트 넣음 됨</div>
                <p>1. 헤더바 보더라인 임의로 해놓음 지워도댐(사이드바도)
                   <br/>2. index.css 전부 주석처리함(전역으로 css적용되서 걍 주석처리함)
                   <br/>3. 메인페이지css(MainPage.module.css)에 전역css 하나 적용한거 있음 확인해쥬셈 아마 모든컴포넌트에 적용될 듯?
                </p>
            </div>
        </div>
    )
}

export default MainPage;