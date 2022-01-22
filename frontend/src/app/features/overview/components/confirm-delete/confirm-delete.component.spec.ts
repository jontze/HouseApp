import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ConfirmDeleteComponent } from './confirm-delete.component';

describe('ConfirmDeleteComponent', () => {
  let component: ConfirmDeleteComponent;
  let fixture: ComponentFixture<ConfirmDeleteComponent>;
  let ngUnsubscribe: Subject<unknown>;
  let mockModalRef: jasmine.SpyObj<BsModalRef>;

  beforeEach(async () => {
    ngUnsubscribe = new Subject();
    mockModalRef = jasmine.createSpyObj('BsModalRef', ['hide']);

    await TestBed.configureTestingModule({
      declarations: [ConfirmDeleteComponent],
      providers: [
        {
          provide: BsModalRef,
          useValue: mockModalRef,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    ngUnsubscribe.next();
    ngUnsubscribe.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close and decline modal', () => {
    component.entryId = 1;
    component.decision$.pipe(takeUntil(ngUnsubscribe)).subscribe((decision) => {
      expect(decision.id).toBe(component.entryId!);
      expect(decision.shouldDelete).toBe(false);
    });
    component.closeAndDecline();
    expect(mockModalRef.hide).toHaveBeenCalled();
  });

  it('should throw error on close and decline due to missing entry id', () => {
    expect(() => {
      component.closeAndDecline();
    }).toThrowError('entryId not defined in confirm modal');
    expect(mockModalRef.hide).not.toHaveBeenCalled();
  });

  it('should close and confirm modal', () => {
    component.entryId = 1;
    component.decision$.pipe(takeUntil(ngUnsubscribe)).subscribe((decision) => {
      expect(decision.id).toBe(component.entryId!);
      expect(decision.shouldDelete).toBe(true);
    });
    component.closeAndConfirm();
    expect(mockModalRef.hide).toHaveBeenCalled();
  });

  it('should throw error on close and confirm due to missing entry id', () => {
    expect(() => {
      component.closeAndConfirm();
    }).toThrowError('entryId not defined in confirm modal');
    expect(mockModalRef.hide).not.toHaveBeenCalled();
  });
});
