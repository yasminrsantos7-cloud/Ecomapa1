import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Conquistas } from './conquistas';

describe('Conquistas', () => {
  let component: Conquistas;
  let fixture: ComponentFixture<Conquistas>;

  beforeEach(async () => {
    
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [Conquistas],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Conquistas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve iniciar com os dados zerados', () => {
    expect(component.perfil.nivel).toBe(1);
    expect(component.perfil.pontosAcumulados).toBe(0);
    expect(component.perfil.totalDescartes).toBe(0);
    expect(component.historico.length).toBe(0);
  });

  it('deve evoluir o perfil ao registrar um descarte', () => {
   
    component.registrarDescarte('Vidro (🍼)', 'Ponto Teste');
    
    expect(component.perfil.totalDescartes).toBe(1);
    expect(component.perfil.pontosAcumulados).toBe(150);
    expect(component.historico.length).toBe(1);
    expect(component.badges[0].desbloqueado).toBeTrue(); 
  });
});