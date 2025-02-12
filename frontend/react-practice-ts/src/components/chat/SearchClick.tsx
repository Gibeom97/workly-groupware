const SearchClick = () => {
    return (
        <>
            <div className="searchClick" style={{width: 274, height: 28, position: 'relative'}}>
            <div style={{width: 200, height: 10, paddingLeft: 40, paddingRight: 10, paddingTop: 7, paddingBottom: 7, left: 0, top: 0, position: 'absolute', background: 'white', borderRadius: 9999, overflow: 'hidden', border: '1px #D9D9D9 solid', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
                <div style={{flex: '1 1 0', color: '#B3B3B3', fontSize: 14, fontFamily: 'Inter', fontWeight: '600', lineHeight: 14, wordWrap: 'break-word'}}>  이름 검색</div>
                <div data-svg-wrapper>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 12M4 4L12 12" stroke="#1E1E1E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </div>
            </div>
            <div data-svg-wrapper style={{left: 12, position: 'absolute'}}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_55_3525)">
            <path d="M9.625 9.625L7.63125 7.63125M8.70833 5.04167C8.70833 7.06671 7.06671 8.70833 5.04167 8.70833C3.01662 8.70833 1.375 7.06671 1.375 5.04167C1.375 3.01662 3.01662 1.375 5.04167 1.375C7.06671 1.375 8.70833 3.01662 8.70833 5.04167Z" stroke="#B3B3B3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_55_3525">
            <rect width="11" height="11" fill="white"/>
            </clipPath>
            </defs>
            </svg>
            </div>
            </div>

        </>
    )
}

export default SearchClick