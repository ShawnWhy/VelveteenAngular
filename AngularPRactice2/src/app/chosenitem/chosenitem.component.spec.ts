import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenitemComponent } from './chosenitem.component';

describe('ChosenitemComponent', () => {
  let component: ChosenitemComponent;
  let fixture: ComponentFixture<ChosenitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChosenitemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChosenitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
