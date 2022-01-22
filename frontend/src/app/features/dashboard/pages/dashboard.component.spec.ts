import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let mockStoreService: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    mockStoreService = jasmine.createSpyObj('Store', ['select']);
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: Store,
          useValue: mockStoreService,
        },
      ],
      declarations: [DashboardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call store on init', () => {
    expect(mockStoreService.select).toHaveBeenCalledTimes(3);
  });
});
