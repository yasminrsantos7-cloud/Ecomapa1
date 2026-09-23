import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Guia } from './guia';

describe('Guia', () => {
  let component: Guia;
  let fixture: ComponentFixture<Guia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Guia],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Guia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir o cabeçalho sem links de navegação', () => {
    const cabecalho: HTMLElement = fixture.nativeElement.querySelector('.navbar');
    const links: NodeListOf<HTMLAnchorElement> =
      fixture.nativeElement.querySelectorAll('.menu a');

    expect(cabecalho).toBeTruthy();
    expect(links.length).toBe(0);
  });

  it('deve renderizar as seis categorias da página inicial', () => {
    const botoes = fixture.nativeElement.querySelectorAll('.card-atalho');

    expect(botoes.length).toBe(6);
  });

  it('deve atualizar o guia ao selecionar metal', () => {
    component.selecionarCategoria('metal');
    fixture.detectChanges();

    expect(component.guiaAtual().nomeItem).toBe('Metal');
    expect(component.guiaAtual().etapas.length).toBe(4);
  });

  it('deve exibir informações próprias para cada categoria', () => {
    const categorias = component.categorias();

    categorias.forEach((categoria) => {
      component.selecionarCategoria(categoria.id);

      expect(component.guiaAtual().idCategoria).toBe(categoria.id);
      expect(component.guiaAtual().etapas.length).toBe(4);
      expect(component.guiaAtual().curiosidade.texto).toBeTruthy();
    });
  });
});