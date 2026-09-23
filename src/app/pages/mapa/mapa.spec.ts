import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';

import { Mapa } from './mapa';

describe('Mapa', () => {
  let component: Mapa;
  let fixture: ComponentFixture<Mapa>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate', 'createUrlTree', 'serializeUrl']);
    routerSpy.createUrlTree.and.returnValue({} as any);
    routerSpy.serializeUrl.and.callFake((url: unknown) => String(url));
    Object.defineProperty(routerSpy, 'events', { value: of([]), writable: true });
    Object.defineProperty(routerSpy, 'url', { value: '/mapa', writable: true });

    await TestBed.configureTestingModule({
      imports: [Mapa],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ categoria: 'eletronicos' })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Mapa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve ler o filtro inicial da rota', () => {
    expect(component.categoriaFiltro()).toBe('eletronicos');
  });

  it('deve filtrar os pontos pelo termo da busca', () => {
    component.categoriaFiltro.set('eletronicos');
    component.termoBusca.set('Portão da Piedade');
    fixture.detectChanges();

    expect(component.pontosFiltrados().length).toBe(1);
    expect(component.pontosFiltrados()[0].nome).toBe('Ecoponto Portão da Piedade');
  });

  it('deve selecionar um ponto', () => {
    const ponto = component.pontos()[0];
    component.selecionarPonto(ponto);

    expect(component.pontoSelecionado()?.id).toBe(ponto.id);
  });

  it('deve listar os cinco pontos de pilhas', () => {
    component.filtrarPorCategoria('pilhas');

    expect(component.pontosFiltrados().length).toBe(5);
    expect(component.pontosFiltrados().every((ponto) => ponto.categoriasAceitas.includes('pilhas'))).toBeTrue();
  });

  it('deve listar os cinco pontos de medicamentos', () => {
    component.filtrarPorCategoria('medicamentos');

    expect(component.pontosFiltrados().length).toBe(5);
    expect(component.pontosFiltrados().every((ponto) => ponto.categoriasAceitas.includes('medicamentos'))).toBeTrue();
  });

  it('deve listar os quatro pontos de metais', () => {
    component.filtrarPorCategoria('metais');

    expect(component.pontosFiltrados().length).toBe(4);
    expect(component.pontosFiltrados().every((ponto) => ponto.categoriasAceitas.includes('metais'))).toBeTrue();
  });

  it('deve listar os quatro pontos de plásticos', () => {
    component.filtrarPorCategoria('plasticos');

    expect(component.pontosFiltrados().length).toBe(4);
    expect(component.pontosFiltrados().every((ponto) => ponto.categoriasAceitas.includes('plasticos'))).toBeTrue();
  });

  it('deve listar os cinco pontos de papel', () => {
    component.filtrarPorCategoria('papel');

    expect(component.pontosFiltrados().length).toBe(5);
    expect(component.pontosFiltrados().every((ponto) => ponto.categoriasAceitas.includes('papel'))).toBeTrue();
  });
});
