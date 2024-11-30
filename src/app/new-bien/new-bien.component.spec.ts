import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBienComponent } from './new-bien.component';

describe('NewBienComponent', () => {
  let component: NewBienComponent;
  let fixture: ComponentFixture<NewBienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
