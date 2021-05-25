import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComSectionComponent } from './com-section.component';

describe('ComSectionComponent', () => {
  let component: ComSectionComponent;
  let fixture: ComponentFixture<ComSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
