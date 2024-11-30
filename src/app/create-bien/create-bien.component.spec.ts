import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBienComponent } from './create-bien.component';

describe('CreateBienComponent', () => {
  let component: CreateBienComponent;
  let fixture: ComponentFixture<CreateBienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
