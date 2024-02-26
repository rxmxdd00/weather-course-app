import { Component, OnInit } from '@angular/core';

import { ICurrentWeather } from '../interfaces';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { WeatherService } from '../weather/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})

export class CurrentWeatherComponent implements OnInit {

  current !: ICurrentWeather;
  constructor(private weatherService: WeatherService) {

  }

  ngOnInit(): void {
 
  }

  search  (city: string, country:string) {
    const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);
    const formattedCountry = country.toUpperCase();
  
    if(formattedCity && formattedCountry) {
      this.weatherService.getCurrentWeather(formattedCity, formattedCountry)
      .subscribe((data) => this.current = data)
    }
  }
}
