import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallitemComponent } from './smallitem.component';

describe('SmallitemComponent', () => {
  let component: SmallitemComponent;
  let fixture: ComponentFixture<SmallitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallitemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmallitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
