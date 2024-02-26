import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherServiceFake, fakeWeather } from '../weather/weather.service.fake';

import { By } from '@angular/platform-browser';
import { CurrentWeatherComponent } from './current-weather.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { WeatherService } from '../weather/weather.service';
import { injectSpy } from 'angular-unit-test-helper';
import { of } from 'rxjs';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let weatherServiceMock: jasmine.SpyObj<WeatherService>
  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getCurrentWeather'])
    await TestBed.configureTestingModule({
      declarations: [ CurrentWeatherComponent ],
      imports: [HttpClientTestingModule],
      providers:[{provide: WeatherService, useValue: weatherServiceSpy}]
    })
    .compileComponents();
    weatherServiceMock = injectSpy(WeatherService)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    //Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of())
    //Act
    fixture.detectChanges()
    //Assert
    expect(component).toBeTruthy();
  });

  it('should get currentWeather from weatherService', (done) => {
    // Arrange

    weatherServiceMock.getCurrentWeather.and.returnValue(of(fakeWeather))
    // store.setState({ search: { current: fakeWeather } })
    // weatherServiceMock.currentWeather$.next(fakeWeather)

    // Act
    fixture.detectChanges() // triggers ngOnInit()

    // Assert
    expect(component.current).toBeDefined()
    expect(component.current.city).toEqual('Bethesda')
    expect(component.current.temperature).toEqual(280.32)

    // Assert on DOM
    const debugEl = fixture.debugElement
    const titleEl: HTMLElement = debugEl.query(By.css('.mat-title')).nativeElement
     expect(titleEl.textContent).toContain('Bethesda')

    // expect (component.current.subscribe((current) => {

    // })
  })
});
