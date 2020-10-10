import axios from 'axios';
import { IMAGE_URL, SENTENCE_URL, WEATHER_URL } from '@/const/apis';

// 获取背景图片
export const getBgImg = () => {
  return new Promise((resolve, reject) => {
    axios.get(IMAGE_URL).then(({ data, status }) => {
      if (status !== 200) {
        return reject(new Error('Network Error'))
      }
      resolve(`https://bing.com${data.images[0].url}`);
    }).catch(reject);
  })
}

// 获取文案
export const getSentense = () => {
  return new Promise((resolve, reject) => {
    axios.get(SENTENCE_URL).then(({ data, status }) => {
      if (status !== 200) {
        return reject(new Error('Network Error'))
      }
      resolve({title: data.content, subtitle: data.note});
      resolve()
    }).catch(reject);
  })
}

// 获取天气
export const getWeather = () => {
  return new Promise((resolve, reject) => {
    axios.get(WEATHER_URL).then(({ data, status }) => {
      if (status !== 200) {
        return reject(new Error('Network Error'))
      }
      const { city, SD, temp, WSE, WD } = data.weatherinfo;
      resolve({
        city,
        windDirection: WD,
        humidity: SD,
        windPower: WSE,
        temperature: temp,
      })
    }).catch(reject);
  })
}
