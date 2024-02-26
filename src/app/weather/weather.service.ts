import { HttpClient, HttpParams } from '@angular/common/http';

import { ICurrentWeather } from '../interfaces';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

export interface IWeatherService{
  getCurrentWeather(
    city:string,
    country:string
  ) : Observable<ICurrentWeather>
}

interface ICurrentWeatherData {
  weather: [
    {
      description:string,
      icon: string
    }
  ],
  main:{
    temp : number,
  },
  sys: {
    coutry : string
  },
  dt:number,
  name:string
}

@Injectable({
  providedIn: 'root'
})

export class WeatherService implements IWeatherService{

  constructor(private httpClient : HttpClient) { }

  getCurrentWeather(city: string, country:string):Observable<ICurrentWeather>{
    const uriParams = new HttpParams()
      .set('q', `${city}, ${country}`)
      .set('appid', environment.appId)
    // return this.httpClient.get<ICurrentWeatherData>(
    //   `${environment.basedUrl}http://api.openweathermap.org/data/2.5/weather?`+
    //   // `q=${city},${country}&appid=${environment.appId}`
    //   { params: uriParams }
    //   )
    return this.httpClient
    .get<ICurrentWeatherData>(
      `http://api.openweathermap.org/data/2.5/weather`,
      { params: uriParams }
    )
    .pipe(map((data) => this.transformToICurrentWeather(data)))
  }

  private transformToICurrentWeather(data : ICurrentWeatherData) : ICurrentWeather{
    return {
      city: data.name,
      country: data.sys.coutry,
      date: data.dt * 1000,
      image : `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature : this.convertKelvinToFahrenheit(data.main.temp),
      description : data.weather[0].description
    }
  }
  private convertKelvinToFahrenheit(kelvin:number): number{
    return (kelvin * 9) / 5 - 459.67;
  }


}
