import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

export interface PontoColeta {
  id: string;
  nome: string;
  endereco: string;
  distanciaKm: number;
  status: string;
  horario: string;
  avaliacao: number;
  categoriasAceitas: string[];
  lat: number;
  lng: number;
  telefone?: string;
}

export interface CategoriaFiltro {
  id: string;
  nome: string;
  icone: string;
}

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mapa.html',
  styleUrl: './mapa.css',
})
export class Mapa implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  menuAberto = false;

  menuItens = [
    { rotulo: 'Início', link: '/inicio' },
    { rotulo: 'Guia', link: '/guia' },
    { rotulo: 'Mapa', link: '/mapa' },
    { rotulo: 'Conquistas', link: '/conquistas' },
  ];

  menuCabecalho: { rotulo: string; link: string }[] = [];

  readonly categorias = signal<CategoriaFiltro[]>([
    { id: 'eletronicos', nome: 'Eletrônicos', icone: '📱' },
    { id: 'pilhas', nome: 'Pilhas/Baterias', icone: '🔋' },
    { id: 'medicamentos', nome: 'Medicamentos', icone: '💊' },
    { id: 'metais', nome: 'Metais', icone: '⚙️' },
    { id: 'plasticos', nome: 'Plásticos', icone: '🍾' },
    { id: 'papel', nome: 'Papel', icone: '📦' },
    { id: 'vidro', nome: 'Vidro', icone: '🍼' }
  ]);

  readonly categoriaFiltro = signal<string>('');
  readonly termoBusca = signal<string>('');
  readonly pontoSelecionado = signal<PontoColeta | null>(null);

  readonly pontos = signal<PontoColeta[]>([
    {
      id: '1',
      nome: 'Ecoponto Ladeira da Praça',
      endereco: 'Ladeira da Praça, 27 - Centro Histórico, Salvador - BA, 42500-064, Brazil',
      distanciaKm: 1.2,
      status: 'Aberto agora',
      horario: '08:00 - 18:00',
      avaliacao: 4.8,
      categoriasAceitas: ['eletronicos'],
      lat: -12.9718,
      lng: -38.5108,
      telefone: '(71) 3321-0000'
    },
    {
      id: '2',
      nome: 'Ecoponto Portão da Piedade',
      endereco: 'R. Portão da Piedade, 155 - Dois de Julho, Salvador - BA, 40070-045, Brazil',
      distanciaKm: 2.1,
      status: 'Aberto agora',
      horario: '07:30 - 17:00',
      avaliacao: 4.9,
      categoriasAceitas: ['eletronicos'],
      lat: -12.9817,
      lng: -38.5074,
      telefone: '(71) 3345-1122'
    },
    {
      id: '3',
      nome: 'Ecoponto Conselheiro Junqueira Ayres',
      endereco: 'Rua Conselheiro Junqueira Ayres, 165 - Barris, Salvador - BA, 40070-080, Brazil',
      distanciaKm: 2.8,
      status: 'Aberto agora',
      horario: '08:00 - 18:00',
      avaliacao: 4.7,
      categoriasAceitas: ['eletronicos'],
      lat: -12.9855,
      lng: -38.505,
      telefone: '(71) 3264-9988'
    },
    {
      id: '4',
      nome: 'Ecoponto Vasco da Gama',
      endereco: 'Av. Vasco da Gama, 437 - Engenho Velho de Brotas, Salvador - BA, 40240-090, Brazil',
      distanciaKm: 3.6,
      status: 'Aberto agora',
      horario: '08:00 - 18:00',
      avaliacao: 4.7,
      categoriasAceitas: ['eletronicos'],
      lat: -12.989,
      lng: -38.494,
      telefone: '(71) 99999-8888'
    },
    {
      id: '5',
      nome: 'Ecoponto Granjas Rurais',
      endereco: 'R. da Mauritânia, 4 - Granjas Rurais Pres. Vargas, Salvador - BA, 41230-040, Brazil',
      distanciaKm: 6.2,
      status: 'Aberto agora',
      horario: '08:00 - 17:00',
      avaliacao: 4.6,
      categoriasAceitas: ['eletronicos'],
      lat: -12.93,
      lng: -38.47,
      telefone: '(71) 99888-7777'
    },
    {
      id: '6',
      nome: 'Ponto de Pilhas Conselheiro Junqueira Ayres',
      endereco: 'Rua Conselheiro Junqueira Ayres, 8 - Barris, Salvador - BA, 40070-080, Brazil',
      distanciaKm: 2.7,
      status: 'Aberto agora',
      horario: '08:00 - 18:00',
      avaliacao: 4.8,
      categoriasAceitas: ['pilhas'],
      lat: -12.9842,
      lng: -38.5048,
      telefone: '(71) 3321-0011'
    },
    {
      id: '7',
      nome: 'Ponto de Pilhas Almeida Couto',
      endereco: 'Praça Conselheiro Almeida Couto, 6 - Nazaré, Salvador - BA, 40050-405, Brazil',
      distanciaKm: 3.1,
      status: 'Aberto agora',
      horario: '08:00 - 17:00',
      avaliacao: 4.7,
      categoriasAceitas: ['pilhas'],
      lat: -12.9788,
      lng: -38.507,
      telefone: '(71) 3321-0012'
    },
    {
      id: '8',
      nome: 'Ponto de Pilhas Frederico Costa',
      endereco: 'R. Frederico Costa, 123 - Brotas, Salvador - BA, 40243-045, Brazil',
      distanciaKm: 3.9,
      status: 'Aberto agora',
      horario: '08:00 - 18:00',
      avaliacao: 4.6,
      categoriasAceitas: ['pilhas'],
      lat: -12.9895,
      lng: -38.489,
      telefone: '(71) 3321-0013'
    },
    {
      id: '9',
      nome: 'Ponto de Pilhas Conselheiro Junqueira Ayres 2',
      endereco: 'Rua Conselheiro Junqueira Ayres, 8 - Barris, Salvador - BA, 40070-080, Brazil',
      distanciaKm: 2.7,
      status: 'Aberto agora',
      horario: '08:00 - 18:00',
      avaliacao: 4.8,
      categoriasAceitas: ['pilhas'],
      lat: -12.9842,
      lng: -38.5048,
      telefone: '(71) 3321-0014'
    },
    {
      id: '10',
      nome: 'Ponto de Pilhas Sete de Setembro',
      endereco: 'Av. Sete de Setembro, 122 - Centro, Salvador - BA, 40060-001, Brazil',
      distanciaKm: 1.5,
      status: 'Aberto agora',
      horario: '08:00 - 18:00',
      avaliacao: 4.9,
      categoriasAceitas: ['pilhas'],
      lat: -12.9765,
      lng: -38.512,
      telefone: '(71) 3321-0015'
    },
    {
      id: '11',
      nome: 'Ponto de Medicamentos Miguel Calmon',
      endereco: 'R. Miguel Calmon, 37 - Comércio, Salvador - BA, 40015-010, Brazil',
      distanciaKm: 1.4,
      status: 'Aberto agora',
      horario: '08:00 - 18:00',
      avaliacao: 4.8,
      categoriasAceitas: ['medicamentos'],
      lat: -12.9695,
      lng: -38.5115,
      telefone: '(71) 3321-0021'
    },
    {
      id: '12',
      nome: 'Ponto de Medicamentos Joana Angélica',
      endereco: 'Av. Joana Angélica, 924 - Nazaré, Salvador - BA, 40045-205, Brazil',
      distanciaKm: 2.9,
      status: 'Aberto agora',
      horario: '08:00 - 17:00',
      avaliacao: 4.7,
      categoriasAceitas: ['medicamentos'],
      lat: -12.978,
      lng: -38.5055,
      telefone: '(71) 3321-0022'
    },
    {
      id: '13',
      nome: 'Ponto de Medicamentos Joana Angélica 2',
      endereco: 'Av. Joana Angélica, 924 - Nazaré, Salvador - BA, 40045-205, Brazil',
      distanciaKm: 2.9,
      status: 'Aberto agora',
      horario: '08:00 - 17:00',
      avaliacao: 4.7,
      categoriasAceitas: ['medicamentos'],
      lat: -12.978,
      lng: -38.5055,
      telefone: '(71) 3321-0023'
    },
    {
      id: '14',
      nome: 'Ponto de Medicamentos Sabino Silva',
      endereco: 'R. Prof. Sabino Silva, 674 - Ondina, Salvador - BA, 40155-250, Brazil',
      distanciaKm: 4.8,
      status: 'Aberto agora',
      horario: '08:00 - 18:00',
      avaliacao: 4.6,
      categoriasAceitas: ['medicamentos'],
      lat: -13.003,
      lng: -38.519,
      telefone: '(71) 3321-0024'
    },
    {
      id: '15',
      nome: 'Ponto de Medicamentos Dom João VI',
      endereco: 'Av. Dom João VI, 446 - Candeal, Salvador - BA, 40285-000, Brazil',
      distanciaKm: 5.2,
      status: 'Aberto agora',
      horario: '08:00 - 17:00',
      avaliacao: 4.8,
      categoriasAceitas: ['medicamentos'],
      lat: -12.997,
      lng: -38.477,
      telefone: '(71) 3321-0025'
    },
    {
      id: '16',
      nome: 'Ponto de Metais Porto Seco',
      endereco: 'Rodovia BR-324, Km 618, s/n - Porto Seco, Salvador - BA, 41233-030, Brazil',
      distanciaKm: 8.4,
      status: 'Aberto agora',
      horario: '08:00 - 17:00',
      avaliacao: 4.7,
      categoriasAceitas: ['metais'],
      lat: -12.91,
      lng: -38.46,
      telefone: '(71) 3321-0031'
    },
    {
      id: '17',
      nome: 'Ponto de Metais R. Chile',
      endereco: 'R. Chile, 15 - Centro Histórico, Salvador - BA, 40020-000, Brazil',
      distanciaKm: 1.1,
      status: 'Aberto agora',
      horario: '08:00 - 18:00',
      avaliacao: 4.8,
      categoriasAceitas: ['metais'],
      lat: -12.971,
      lng: -38.512,
      telefone: '(71) 3321-0032'
    },
    {
      id: '18',
      nome: 'Ponto de Metais Nova República',
      endereco: 'Av. Nova República, 489 - Pituba, Salvador - BA, 41905-860, Brazil',
      distanciaKm: 5.6,
      status: 'Aberto agora',
      horario: '08:00 - 17:00',
      avaliacao: 4.6,
      categoriasAceitas: ['metais'],
      lat: -12.997,
      lng: -38.464,
      telefone: '(71) 3321-0033'
    },
    {
      id: '19',
      nome: 'Ponto de Metais Tancredo Neves',
      endereco: 'Av. Tancredo Neves, 3133 - Caminho das Árvores, Salvador - BA, 41100-800, Brazil',
      distanciaKm: 6.8,
      status: 'Aberto agora',
      horario: '08:00 - 18:00',
      avaliacao: 4.9,
      categoriasAceitas: ['metais'],
      lat: -12.978,
      lng: -38.456,
      telefone: '(71) 3321-0034'
    },
    {
      id: '20',
      nome: 'Ponto de Plásticos Aloísio de Carvalho Filho',
      endereco: 'R. Prof. Aloísio de Carvalho Filho, 74 - Engenho Velho de Brotas, Salvador - BA, 40243-620, Brazil',
      distanciaKm: 2.6,
      status: 'Aberto agora',
      horario: '08:00 - 18:00',
      avaliacao: 4.8,
      categoriasAceitas: ['plasticos'],
      lat: -12.9877,
      lng: -38.4987,
      telefone: '(71) 3321-0041'
    },
    {
      id: '21',
      nome: 'Ponto de Plásticos Nova República',
      endereco: 'R. Nova República, 423 - Santa Cruz, Salvador - BA, 41905-755, Brazil',
      distanciaKm: 5.3,
      status: 'Aberto agora',
      horario: '08:00 - 17:00',
      avaliacao: 4.6,
      categoriasAceitas: ['plasticos'],
      lat: -12.985,
      lng: -38.466,
      telefone: '(71) 3321-0042'
    },
    {
      id: '22',
      nome: 'Ponto de Plásticos Nova República 2',
      endereco: 'Av. Nova República, 489 - Pituba, Salvador - BA, 41905-860, Brazil',
      distanciaKm: 5.6,
      status: 'Aberto agora',
      horario: '08:00 - 17:00',
      avaliacao: 4.7,
      categoriasAceitas: ['plasticos'],
      lat: -12.997,
      lng: -38.464,
      telefone: '(71) 3321-0043'
    },
    {
      id: '23',
      nome: 'Ponto de Plásticos Mauritânia',
      endereco: 'R. da Mauritânia, 4 - Granjas Rurais Pres. Vargas, Salvador - BA, 41230-040, Brazil',
      distanciaKm: 6.2,
      status: 'Aberto agora',
      horario: '08:00 - 17:00',
      avaliacao: 4.6,
      categoriasAceitas: ['plasticos'],
      lat: -12.93,
      lng: -38.47,
      telefone: '(71) 3321-0044'
    },
    {
      id: '24',
      nome: 'Ponto de Papel Ladeira da Independência',
      endereco: 'Ladeira da Independência, 57 - Tororó, Salvador - BA, 40040-340, Brazil',
      distanciaKm: 2.4,
      status: 'Aberto agora',
      horario: '08:00 - 18:00',
      avaliacao: 4.7,
      categoriasAceitas: ['papel'],
      lat: -12.982,
      lng: -38.505,
      telefone: '(71) 3321-0051'
    },
    {
      id: '25',
      nome: 'Ponto de Papel Cônego Pereira',
      endereco: 'R. Cônego Pereira, 179 - Barbalho, Salvador - BA, 40300-756, Brazil',
      distanciaKm: 3.5,
      status: 'Aberto agora',
      horario: '08:00 - 17:00',
      avaliacao: 4.8,
      categoriasAceitas: ['papel'],
      lat: -12.968,
      lng: -38.503,
      telefone: '(71) 3321-0052'
    },
    {
      id: '26',
      nome: 'Ponto de Papel Porto Seco',
      endereco: 'Rodovia BR-324, Km 618, s/n - Porto Seco, Salvador - BA, 41233-030, Brazil',
      distanciaKm: 8.4,
      status: 'Aberto agora',
      horario: '08:00 - 17:00',
      avaliacao: 4.6,
      categoriasAceitas: ['papel'],
      lat: -12.91,
      lng: -38.46,
      telefone: '(71) 3321-0053'
    },
    {
      id: '27',
      nome: 'Ponto de Papel Aloísio de Carvalho Filho',
      endereco: 'R. Prof. Aloísio de Carvalho Filho, 74 - Engenho Velho de Brotas, Salvador - BA, 40243-620, Brazil',
      distanciaKm: 2.6,
      status: 'Aberto agora',
      horario: '08:00 - 18:00',
      avaliacao: 4.7,
      categoriasAceitas: ['papel'],
      lat: -12.9877,
      lng: -38.4987,
      telefone: '(71) 3321-0054'
    },
    {
      id: '28',
      nome: 'Ponto de Papel Cônego Pereira 2',
      endereco: 'R. Cônego Pereira, 179 - Barbalho, Salvador - BA, 40300-756, Brazil',
      distanciaKm: 3.5,
      status: 'Aberto agora',
      horario: '08:00 - 17:00',
      avaliacao: 4.8,
      categoriasAceitas: ['papel'],
      lat: -12.968,
      lng: -38.503,
      telefone: '(71) 3321-0055'
    },
    {
      id: '29',
      nome: 'Ponto de Vidro Santos Titara',
      endereco: 'R. Santos Titara, 22 - Massaranduba, Salvador - BA, 40435-480, Brazil',
      distanciaKm: 4.5,
      status: 'Aberto agora',
      horario: '08:00 - 18:00',
      avaliacao: 4.8,
      categoriasAceitas: ['vidro'],
      lat: -12.922,
      lng: -38.502,
      telefone: '(71) 3321-0061'
    },
    {
      id: '30',
      nome: 'Ponto de Vidro Santos Titara 2',
      endereco: 'R. Santos Titara, 22 - Massaranduba, Salvador - BA, 40435-480, Brazil',
      distanciaKm: 4.5,
      status: 'Aberto agora',
      horario: '08:00 - 18:00',
      avaliacao: 4.7,
      categoriasAceitas: ['vidro'],
      lat: -12.922,
      lng: -38.502,
      telefone: '(71) 3321-0062'
    },
    {
      id: '31',
      nome: 'Ponto de Vidro Ladeira da Independência',
      endereco: 'Ladeira da Independência, 57 - Tororó, Salvador - BA, 40040-340, Brazil',
      distanciaKm: 2.4,
      status: 'Aberto agora',
      horario: '08:00 - 18:00',
      avaliacao: 4.8,
      categoriasAceitas: ['vidro'],
      lat: -12.982,
      lng: -38.505,
      telefone: '(71) 3321-0063'
    },
    {
      id: '32',
      nome: 'Ponto de Vidro Aloísio de Carvalho Filho',
      endereco: 'R. Prof. Aloísio de Carvalho Filho, 74 - Engenho Velho de Brotas, Salvador - BA, 40243-620, Brazil',
      distanciaKm: 2.6,
      status: 'Aberto agora',
      horario: '08:00 - 18:00',
      avaliacao: 4.7,
      categoriasAceitas: ['vidro'],
      lat: -12.9877,
      lng: -38.4987,
      telefone: '(71) 3321-0064'
    },
    {
      id: '33',
      nome: 'Ponto de Vidro Aloísio de Carvalho Filho 2',
      endereco: 'R. Prof. Aloísio de Carvalho Filho, 74 - Engenho Velho de Brotas, Salvador - BA, 40243-620, Brazil',
      distanciaKm: 2.6,
      status: 'Aberto agora',
      horario: '08:00 - 18:00',
      avaliacao: 4.8,
      categoriasAceitas: ['vidro'],
      lat: -12.9877,
      lng: -38.4987,
      telefone: '(71) 3321-0065'
    }
  ]);

  readonly pontosFiltrados = computed(() => {
    const categoria = this.categoriaFiltro();
    const busca = this.termoBusca().toLowerCase().trim();

    return this.pontos().filter((ponto) => {
      const atendeCategoria = categoria !== '' && ponto.categoriasAceitas.includes(categoria);
      const atendeBusca =
        !busca ||
        ponto.nome.toLowerCase().includes(busca) ||
        ponto.endereco.toLowerCase().includes(busca);

      return atendeCategoria && atendeBusca;
    });
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['categoria']) {
        this.categoriaFiltro.set(params['categoria']);
      }
    });

    const primeiro = this.pontosFiltrados()[0] ?? null;
    this.pontoSelecionado.set(primeiro);
  }

  filtrarPorCategoria(idCat: string): void {
    this.categoriaFiltro.set(idCat);
    const primeiro = this.pontosFiltrados()[0] ?? null;
    this.pontoSelecionado.set(primeiro);
  }

  atualizarBusca(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.termoBusca.set(input.value);
    const primeiro = this.pontosFiltrados()[0] ?? null;
    this.pontoSelecionado.set(primeiro);
  }

  pesquisarNoGoogleMaps(): void {
    const busca = this.termoBusca().trim();

    if (!busca) {
      return;
    }

    const consulta = encodeURIComponent(busca);
    window.open(`https://www.google.com/maps/search/?api=1&query=${consulta}`, '_blank');
  }

  selecionarPonto(ponto: PontoColeta): void {
    this.pontoSelecionado.set(ponto);
  }

  tracarRota(ponto: PontoColeta): void {
    const destino = encodeURIComponent(ponto.endereco);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destino}`;
    window.open(url, '_blank');
  }

  navegarPara(rota: string): void {
    this.router.navigate([`/${rota}`]);
  }

  alternarMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu(): void {
    this.menuAberto = false;
  }
}