import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomecommentComponent } from './homecomment.component';

describe('HomecommentComponent', () => {
  let component: HomecommentComponent;
  let fixture: ComponentFixture<HomecommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomecommentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomecommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
