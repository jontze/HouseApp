import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditWindow, IEditWindowUpdate } from '../../models/edit-window';

import { InteractiveTableComponent } from './interactive-table.component';

describe('InteractiveTableComponent', () => {
  let component: InteractiveTableComponent;
  let fixture: ComponentFixture<InteractiveTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InteractiveTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit delete event', () => {
    spyOn(component.onEntryDelete, 'emit');
    component.deleteEntry(1);
    expect(component.onEntryDelete.emit).toHaveBeenCalledOnceWith(1);
  });

  it('should emit update event', () => {
    const updateData: IEditWindowUpdate = {
      id: 1,
      cubicmeter: 100,
      date: new Date().toISOString(),
      type: EditWindow.Water,
    };
    spyOn(component.onEntryUpdate, 'emit');
    component.updateEntry(updateData);
    expect(component.onEntryUpdate.emit).toHaveBeenCalledOnceWith(updateData);
  });
});
