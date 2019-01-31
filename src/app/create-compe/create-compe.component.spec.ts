import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompeComponent } from './create-compe.component';

describe('CreateCompeComponent', () => {
  let component: CreateCompeComponent;
  let fixture: ComponentFixture<CreateCompeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCompeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
