import styles from './SearchBar.module.css'
import search from '../../assets/images/icon/search.png';

const SearchBar = () => {

    return (
        <div className={styles.filterGroup}>
            <select className={styles.select}>
                <option>부서명</option>
            </select>
            <select className={styles.select}>
                <option>직급</option>
            </select>
            <div className={styles.search}>
                <input type="text" className={styles.input} placeholder="사원 검색" />
                <button className={styles.searchButton}><img src={search} alt='search' /></button>
            </div>
        </div>
    )
}

export default SearchBar;
