import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrdensDeServicoListagemPage } from './ordensdeservico-listagem.page';

describe('OrdensdeservicoListagemPage', () => {
  let component: OrdensDeServicoListagemPage;
  let fixture: ComponentFixture<OrdensDeServicoListagemPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdensDeServicoListagemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdensDeServicoListagemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
