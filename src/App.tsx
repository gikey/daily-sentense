import React, { Component, HTMLAttributes } from "react";
import Clock from "react-live-clock";
import { getBgImg, getSentense, getWeather } from "@/services/app";
import "./App.less";

interface IWeather {
  city: string;
  windDirection: string;
  humidity: string;
  windPower: string;
  temperature: string;
}

interface IAppState {
  imgSrc: string;
  title: string;
  subtitle: string;
  weather: IWeather | null;
}

export default class App extends Component<
  HTMLAttributes<HTMLDivElement>,
  IAppState
> {
  constructor(props: HTMLAttributes<HTMLDivElement>) {
    super(props);

    this.state = {
      imgSrc: "",
      title: "",
      subtitle: "",
      weather: null,
    };
  }

  componentDidMount() {
    Promise.all([getBgImg(), getSentense(), getWeather()]).then(
      ([imgSrc, sentense, weather]: any[]) => {
        this.setState({
          imgSrc,
          weather,
          title: sentense.title,
          subtitle: sentense.subtitle,
        });
      }
    );
  }

  render() {
    const { imgSrc, title, subtitle, weather } = this.state;
    return (
      <div className="app" style={{ backgroundImage: `url(${imgSrc})` }}>
        <div className="content">
          <h1 className="title">{title}</h1>
          <h2 className="subtitle">{subtitle}</h2>
        </div>
        <div className="weather">
          <h1 className="temperature">{weather?.temperature}°</h1>
          <div className="items">
            <p className="wind">
              <span>{weather?.windDirection}</span>
              <span>{weather?.windPower}</span>
            </p>
            <h4 className="region">{weather?.city}</h4>
          </div>
        </div>
        <div className="clock">
          <Clock format={"HH:mm:ss"} ticking={true} />
        </div>
      </div>
    );
  }
}
