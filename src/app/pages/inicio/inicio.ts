import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface ResiduoCategoria {
  id: string;
  nome: string;
  icone: string;
  corFundo: string;
}

export interface MetricaDashboard {
  titulo: string;
  icone: string;
  valorPesquisado: string;
  valorComparacao: string;
  rotuloComparacao: string;
  status: 'bom' | 'alerta' | 'perigo';
  dica: string;
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class Inicio implements OnInit, OnDestroy {
  termoBusca = '';
  menuAberto = false;
  indiceCategoriaAtual = 0;
  categoriasPorPagina = 3;
  modoDashboard = false;
  itemPesquisadoNome = '';

  private intervaloCarrossel?: ReturnType<typeof setInterval>;

  menuItens = [
    { rotulo: 'Início', link: '/inicio' },
    { rotulo: 'Guia', link: '/guia' },
    { rotulo: 'Mapa', link: '/mapa' },
    { rotulo: 'Login', link: '/login' }
  ];

  menuCabecalho: { rotulo: string; link: string }[] = [];

  categorias: ResiduoCategoria[] = [
    { id: 'plastico', nome: 'Plástico', icone: '🧴', corFundo: '#dbeafe' },
    { id: 'papel', nome: 'Papel', icone: '📄', corFundo: '#fef3c7' },
    { id: 'vidro', nome: 'Vidro', icone: '🍾', corFundo: '#dcfce7' },
    { id: 'metal', nome: 'Metal', icone: '🥫', corFundo: '#e5e7eb' },
    { id: 'eletronico', nome: 'Eletrônico', icone: '🔋', corFundo: '#ede9fe' }
  ];

  metricasDashboard: MetricaDashboard[] = [];

  constructor(private router: Router) {}

  get categoriasVisiveis(): ResiduoCategoria[] {
    return Array.from({ length: this.categoriasPorPagina }, (_, deslocamento) =>
      this.categorias[(this.indiceCategoriaAtual + deslocamento) % this.categorias.length]
    );
  }

  get metricasVisiveis(): MetricaDashboard[] {
    if (this.metricasDashboard.length === 0) return [];
    return Array.from({ length: this.categoriasPorPagina }, (_, deslocamento) =>
      this.metricasDashboard[(this.indiceCategoriaAtual + deslocamento) % this.metricasDashboard.length]
    );
  }

  ngOnInit(): void {
    this.iniciarAutoplay();
  }

  ngOnDestroy(): void {
    this.pausarCarrossel();
  }

  iniciarAutoplay(): void {
    this.intervaloCarrossel = setInterval(() => this.proximaCategoria(), 4000);
  }

  pausarCarrossel(): void {
    if (this.intervaloCarrossel) {
      clearInterval(this.intervaloCarrossel);
      this.intervaloCarrossel = undefined;
    }
  }

  retomarCarrossel(): void {
    if (!this.intervaloCarrossel) {
      this.iniciarAutoplay();
    }
  }

  proximaCategoria(): void {
    const total = this.modoDashboard ? this.metricasDashboard.length : this.categorias.length;
    if (total > 0) {
      this.indiceCategoriaAtual = (this.indiceCategoriaAtual + 1) % total;
    }
  }

  categoriaAnterior(): void {
    const total = this.modoDashboard ? this.metricasDashboard.length : this.categorias.length;
    if (total > 0) {
      this.indiceCategoriaAtual = (this.indiceCategoriaAtual - 1 + total) % total;
    }
  }

  buscarResiduo(): void {
    const busca = this.termoBusca.trim();
    if (!busca) {
      this.limparBusca();
      return;
    }

    this.itemPesquisadoNome = busca;
    this.modoDashboard = true;
    this.indiceCategoriaAtual = 0;

 
    this.metricasDashboard = [
      {
        titulo: 'Tempo de Decomposição',
        icone: '⏳',
        valorPesquisado: '450 Anos',
        valorComparacao: '3 Meses (Papel)',
        rotuloComparacao: 'vs. Resíduo Orgânico/Papel',
        status: 'perigo',
        dica: 'Demora até 180x mais tempo que o papel para se decompor na natureza.'
      },
      {
        titulo: 'Índice de Reciclabilidade',
        icone: '♻️',
        valorPesquisado: 'Alta (95%)',
        valorComparacao: 'Baixa (20%)',
        rotuloComparacao: 'vs. Média Geral do Lixo',
        status: 'bom',
        dica: 'Muito procurado por cooperativas de catadores locais.'
      },
      {
        titulo: 'Pegada de Carbono',
        icone: '💨',
        valorPesquisado: '6.0 kg CO₂/kg',
        valorComparacao: '0.8 kg CO₂/kg',
        rotuloComparacao: 'vs. Vidro Reciclado',
        status: 'alerta',
        dica: 'A reciclagem reduz em até 70% a emissão de gases estufa.'
      },
      {
        titulo: 'Destino Ideal no Mapa',
        icone: '📍',
        valorPesquisado: 'Ecoponto Plásticos',
        valorComparacao: 'Lixo Comum',
        rotuloComparacao: 'vs. Descarte Sem Triagem',
        status: 'bom',
        dica: 'Existem 12 pontos de coleta próximos de você.'
      }
    ];
  }

  limparBusca(): void {
    this.termoBusca = '';
    this.itemPesquisadoNome = '';
    this.modoDashboard = false;
    this.indiceCategoriaAtual = 0;
  }

  selecionarCategoria(categoria: ResiduoCategoria): void {
    this.termoBusca = categoria.nome;
    this.buscarResiduo();
  }

  alternarMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu(): void {
    this.menuAberto = false;
  }

  sair(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}