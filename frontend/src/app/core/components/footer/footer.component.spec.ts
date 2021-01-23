import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconsModule } from 'src/app/icons/icons.module';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsModule],
      declarations: [FooterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain repo-URI that is defined', () => {
    const testURI = 'test';
    expect(component.ghRepoURI).toBeDefined();
    component.ghRepoURI = testURI;
    expect(component.ghRepoURI).toBe(testURI);
  });

  it('should contain ghIcon', () => {
    const footerDebug: DebugElement = fixture.debugElement;
    const footerNative: HTMLElement = footerDebug.nativeElement;
    expect(footerNative.querySelector('svg.fa-github')).toBeDefined();
  });

  it('should contain link to repo', () => {
    const footerDebug: DebugElement = fixture.debugElement;
    const footerNative: HTMLElement = footerDebug.nativeElement;
    const testURI = 'test';
    fixture.componentInstance.ghRepoURI = testURI;
    fixture.detectChanges();
    expect(footerNative.querySelector('a.nav-link')?.getAttribute('href')).toBe(
      testURI
    );
  });
});
