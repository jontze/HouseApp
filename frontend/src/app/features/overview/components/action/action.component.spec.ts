import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';

import { ActionComponent } from './action.component';

describe('ActionComponent', () => {
  let component: ActionComponent;
  let fixture: ComponentFixture<ActionComponent>;
  let mockModalService: jasmine.SpyObj<BsModalService>;

  beforeEach(async () => {
    mockModalService = jasmine.createSpyObj('BsModalService', ['show']);

    await TestBed.configureTestingModule({
      declarations: [ActionComponent],
      providers: [{ provide: BsModalService, useValue: mockModalService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionComponent);
    component = fixture.componentInstance;
    component.identifier = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should throw error if missing identifier on init', () => {
    component.identifier = undefined;
    expect(() => {
      component.ngOnInit();
    }).toThrowError('Identifier of action component not defined!');
  });

  it('should open confirm dialog and handle decision', () => {
    mockModalService.show.and.returnValue({
      content: {
        decision$: of({ shouldDelete: true, id: 1 }),
      },
    } as unknown as BsModalRef);
    spyOn(component.deleteEntry, 'emit');
    component.openConfirmModal();
    expect(component.deleteEntry.emit).toHaveBeenCalledOnceWith(1);
  });

  it('should open confirm dialog and throw error in missing decision observer', () => {
    mockModalService.show.and.returnValue({
      content: {},
    } as unknown as BsModalRef);
    spyOn(component.deleteEntry, 'emit');

    expect(() => {
      component.openConfirmModal();
    }).toThrowError(
      "Could not subscribe to decision stream! 'desicion$' Observable is null."
    );
    expect(component.deleteEntry.emit).not.toHaveBeenCalled();
  });

  it('should open confirm dialog and do nothing if decision declined', () => {
    mockModalService.show.and.returnValue({
      content: {
        decision$: of({ shouldDelete: false, id: 1 }),
      },
    } as unknown as BsModalRef);
    spyOn(component.deleteEntry, 'emit');
    component.openConfirmModal();
    expect(component.deleteEntry.emit).not.toHaveBeenCalledOnceWith(1);
  });

  it(
    'should open edit modal and update',
    waitForAsync(() => {
      mockModalService.show.and.returnValue({
        content: {
          update$: of({ id: 1 }),
        },
      } as unknown as BsModalRef);
      spyOn(component.changeEntry, 'emit');
      component.openEditModal();
      expect(component.changeEntry.emit).toHaveBeenCalledOnceWith({
        id: 1,
      } as any);
    })
  );

  it(
    'should open edit modal and throw error if missing update stream',
    waitForAsync(() => {
      mockModalService.show.and.returnValue({
        content: {},
      } as unknown as BsModalRef);
      spyOn(component.changeEntry, 'emit');
      expect(() => {
        component.openEditModal();
      }).toThrowError(
        "Could not subscribe to update stream! 'update$' Observable is null."
      );
      expect(component.changeEntry.emit).not.toHaveBeenCalled();
    })
  );
});
