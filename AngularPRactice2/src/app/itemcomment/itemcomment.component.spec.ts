import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemcommentComponent } from './itemcomment.component';

describe('ItemcommentComponent', () => {
  let component: ItemcommentComponent;
  let fixture: ComponentFixture<ItemcommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemcommentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
