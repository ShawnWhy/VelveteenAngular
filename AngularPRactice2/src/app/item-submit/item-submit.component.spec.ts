import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSubmitComponent } from './item-submit.component';

describe('ItemSubmitComponent', () => {
  let component: ItemSubmitComponent;
  let fixture: ComponentFixture<ItemSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemSubmitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
