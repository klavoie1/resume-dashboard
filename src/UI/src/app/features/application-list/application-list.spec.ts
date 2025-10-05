import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationList } from './application-list';

describe('ApplicationList', () => {
  let component: ApplicationList;
  let fixture: ComponentFixture<ApplicationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
