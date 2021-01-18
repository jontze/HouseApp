import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let testTitle = 'testTitle';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set title "testTitle"', () => {
    component.title = testTitle;
    expect(component.title).toBeDefined();
    expect(component.title).toEqual(testTitle);
  });

  it(`should render card with title "${testTitle}"`, () => {
    const cardDe: DebugElement = fixture.debugElement;
    const cardNa: HTMLElement = cardDe.nativeElement;
    expect(cardNa).toBeDefined();
    fixture.componentInstance.title = testTitle;
    fixture.detectChanges();
    expect(cardNa.querySelector('.card-title')?.textContent).toContain(
      testTitle
    );
  });
});
