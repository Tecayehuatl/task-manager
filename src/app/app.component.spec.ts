import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterModule,
        AppComponent,
      ],
      providers: [
        OverlayContainer,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should toggle theme properly', () => {
    const overlayContainer = TestBed.inject(OverlayContainer);
    const overlayContainerElement = overlayContainer.getContainerElement();

    // First no theme class should be applied
    expect(overlayContainerElement.classList.contains('theme-dark')).toBe(false);
    expect(overlayContainerElement.classList.contains('theme-light')).toBe(false);

    // Toggle to dark theme
    const event: MatSlideToggleChange = { checked: true } as MatSlideToggleChange;
    component.toggleTheme(event);

    expect(overlayContainerElement.classList.contains('theme-dark')).toBe(true);
    expect(overlayContainerElement.classList.contains('theme-light')).toBe(false);
  });
});
