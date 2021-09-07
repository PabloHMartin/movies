import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresInputComponent } from './genres-input.component';

describe('GenresInputComponent', () => {
  let component: GenresInputComponent;
  let fixture: ComponentFixture<GenresInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenresInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenresInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
