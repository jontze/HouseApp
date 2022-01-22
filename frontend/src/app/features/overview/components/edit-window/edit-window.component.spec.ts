import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ApiBackendService } from 'src/app/core/services/api-backend.service';
import { EditWindow } from '../../models/edit-window';
import { EditWindowComponent } from './edit-window.component';

describe('EditWindowComponent', () => {
  let component: EditWindowComponent;
  let fixture: ComponentFixture<EditWindowComponent>;
  let mockModalRef: jasmine.SpyObj<BsModalRef>;
  let mockApiService: jasmine.SpyObj<ApiBackendService>;

  beforeEach(async () => {
    mockModalRef = jasmine.createSpyObj('BsModalRef', ['hide']);
    mockApiService = jasmine.createSpyObj('ApiBackendService', [
      'getOilById',
      'getPowerById',
      'getWaterById',
    ]);

    await TestBed.configureTestingModule({
      declarations: [EditWindowComponent],
      providers: [
        {
          provide: BsModalRef,
          useValue: mockModalRef,
        },
        {
          provide: ApiBackendService,
          useValue: mockApiService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWindowComponent);
    component = fixture.componentInstance;
    component.entryId = 1;
    component.type = EditWindow.Power;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should throw error on missing entryId', () => {
    component.entryId = undefined;
    expect(() => {
      component.ngOnInit();
    }).toThrowError('EditWindowComponent: Missing entryId');
    expect(component).toBeTruthy();
  });

  it('should throw error on missing window type', () => {
    component.type = undefined;
    expect(() => {
      component.ngOnInit();
    }).toThrowError('EditWindowComponent: Unexpected EditWindow type');
    expect(component).toBeTruthy();
  });

  it('should close modal', () => {
    component.close();
    expect(mockModalRef.hide).toHaveBeenCalled();
  });

  it('should throw error on missing entry id during update', () => {
    component.entryId = undefined;
    expect(() => {
      component.updateEntry({ date: new Date().toISOString(), kwh: 1000 });
    }).toThrowError('Type or id is not defined');
    expect(mockModalRef.hide).not.toHaveBeenCalled();
  });

  it('should throw error on missing type during update', () => {
    component.type = undefined;
    expect(() => {
      component.updateEntry({ date: new Date().toISOString(), kwh: 1000 });
    }).toThrowError('Type or id is not defined');
    expect(mockModalRef.hide).not.toHaveBeenCalled();
  });

  it('should update entry amd emit data', () => {
    component.updateEntry({ date: new Date().toISOString(), kwh: 1000 });
    expect(mockModalRef.hide).toHaveBeenCalledTimes(1);
  });
});
