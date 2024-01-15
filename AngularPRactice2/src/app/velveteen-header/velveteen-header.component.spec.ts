import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VelveteenHeaderComponent } from './velveteen-header.component';

describe('VelveteenHeaderComponent', () => {
  let component: VelveteenHeaderComponent;
  let fixture: ComponentFixture<VelveteenHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VelveteenHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VelveteenHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
