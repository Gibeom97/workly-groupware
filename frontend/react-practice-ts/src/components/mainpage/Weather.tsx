import axios from "axios";
import { useEffect, useState } from "react";
import weatherDescKo from "./weatherDescKo";
import styles from '../../styles/mainpage/Weather.module.css';
import windImg from "../../assets/images/icon/wind.png";
import feelTempImg from "../../assets/images/icon/feelTemp.png";
import {PacmanLoader} from "react-spinners";

const Weather = () => {
    const API_KEY = import.meta.env.VITE_WEATHER_KEY;
    const [isLoading, setIsLoading] = useState(true); // t 로딩, f 완료
    const [weather, setWeather] = useState({
        description: "",
        name: "",
        temp: 0,
        icon: "",
        windSpeed: 0,
        feelsTemp: 0
    });
    const [forecast, setForecast] = useState([]);

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            // let lat = position.coords.latitude;
            // let lon = position.coords.longitude;
            let lat = "37.5683"; // 서울 좌표
            let lon = "126.9778"; // 서울 좌표
            getWeather(lat, lon);
            getForecast(lat, lon);
        })
    }

    const getForecast = async (lat, lon) => {
        await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
        )
        .then((res) => {
            const list = res.data.list;
            
            // dt_txt 09시가 한국시간으로 18시 -> 9시간 시차  => 한국 시간 15시 = 06시
            let filteredList = list.filter(data =>
                data.dt_txt.includes("06:00:00")
            )

            // 필요한 데이터만 매핑
            const data = filteredList.map(data => {
                const timeStamp = new Date(data.dt * 1000);
                const day = timeStamp.toString().split(" ")[0]; // 요일 추출
                
                const time = timeStamp.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
                const parts = time.split(".");
                const month = parts[1].trim(); 
                const day2 = parts[2].trim().split(" ")[0]; 
                const date = `${month}/${day2}`; // 월/일 형식 추출

                return{
                    day,
                    date,
                    maxTemp: Math.round(data.main.temp_max),
                    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                }
            }) 
            setForecast(data);
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    }

    const getWeather = async (lat, lon) => {
        try {
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
            
            const weatherId = res.data.weather[0].id;
            const weatherKo = weatherDescKo[weatherId]; // id 찾아서 매칭 후 description 한글 번역

            const weatherIcon = res.data.weather[0].icon;
            const weatherIconAdrs = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`; // 날씨 아이콘 

            const cityName = res.data.name; // 지역명 

            const windSpeed = res.data.wind.speed; // 풍속

            const temp = Math.round(res.data.main.temp); // 현재온도

            const feelsTemp = Math.round(res.data.main.feels_like * 10) / 10; // 체감온도

            setWeather({
                description: weatherKo,
                name: cityName,
                temp: temp,
                icon: weatherIconAdrs,
                windSpeed,
                feelsTemp
            });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getCurrentLocation()
    }, []);

    return (
        <div className={styles.widgetContainer}>
            <div className={styles.header}>
                <span>날씨</span>
                <span className={styles.location}>{weather.name}</span>
            </div>
            {isLoading ? (
                <div className={styles.loadingContainer}>
                    <PacmanLoader      
                        color="#4A90E2"
                        cssOverride={{
                            transform: "translate(-50%,-50%)",
                        }}/>  
                </div>
            ) : (
            <div className={styles.weatherContainer}>
                <div className={styles.currentWeather}>
                    <div className={styles.simple}>
                        <img src={weather.icon} className={styles.icon} alt="weatherIcon" />
                        <div className={styles.temperature}>{weather.temp}°</div>
                    </div>
                    <span className={styles.description}>{weather.description}</span>
                    <div className={styles.details}>
                        <div className={styles.windSection}>
                            <img src={windImg} className={styles.windImg} alt="wind-Img"/>
                            <span>{weather.windSpeed}m/s</span>
                        </div>
                        <div className={styles.windSection}>
                            <img src={feelTempImg} className={styles.windImg} alt="feels-like-temp" />
                            <span>{weather.feelsTemp}°</span>
                        </div>
                    </div>
                </div>
                <div className={styles.forecast}>
                    { forecast.map((e, i) => (
                        <div key={i} className={styles.day}>
                            <div className={styles.datSection}>
                                <div className={styles.forecastDay}>{e.day}</div>
                                <div className={styles.forecastDate}>{e.date}</div>
                            </div>
                            <div><img src={e.icon} className={styles.forecastIcon} alt="weather-icon" /></div>
                            <div className={styles.max}>{e.maxTemp}°</div>
                        </div>
                    ))}
                </div>
            </div>
            )}
        </div>
    )
}

export default Weather;

