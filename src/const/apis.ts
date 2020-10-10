import dayjs from "dayjs";

export const SENTENCE_URL = `http://sentence.iciba.com/index.php?c=dailysentence&m=getdetail&title=${dayjs().format(
  "YYYY-MM-DD"
)}&_=${dayjs().valueOf()}`;

export const IMAGE_URL =
  "https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN";

export const WEATHER_URL = "http://www.weather.com.cn/data/sk/101010100.html";
