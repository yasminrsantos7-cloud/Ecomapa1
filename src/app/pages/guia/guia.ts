import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

export interface CategoriaResiduo {
  id: string;
  nome: string;
  icone: string;
  corFundo: string;
}

export interface EtapaDescarte {
  numero: number;
  icone: string;
  titulo: string;
  descricao: string;
}

export interface DetalheGuia {
  idCategoria: string;
  nomeItem: string;
  iconeItem: string;
  etapas: EtapaDescarte[];
  curiosidade: {
    titulo: string;
    texto: string;
  };
}

@Component({
  selector: 'app-guia',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './guia.html',
  styleUrls: ['./guia.css']
})
export class Guia {
  menuAberto = false;

  readonly categorias = signal<CategoriaResiduo[]>([
    { id: 'plastico', nome: 'Plástico', icone: '🧴', corFundo: '#dbeafe' },
    { id: 'papel', nome: 'Papel', icone: '📄', corFundo: '#fef3c7' },
    { id: 'vidro', nome: 'Vidro', icone: '🍾', corFundo: '#dcfce7' },
    { id: 'metal', nome: 'Metal', icone: '🥫', corFundo: '#e5e7eb' },
    { id: 'organico', nome: 'Orgânico', icone: '🍎', corFundo: '#fee2e2' },
    { id: 'eletronico', nome: 'Eletrônico', icone: '🔋', corFundo: '#ede9fe' }
  ]);

  readonly categoriaSelecionadaId = signal('plastico');

  private readonly dadosGuias: Record<string, DetalheGuia> = {
    eletronico: {
      idCategoria: 'eletronico',
      nomeItem: 'Eletrônico',
      iconeItem: '🔋',
      etapas: [
        { numero: 1, icone: '⚙️', titulo: '1. Remova seus dados', descricao: 'Faça backup e restaure as configurações de fábrica do aparelho para proteger seus dados pessoais.' },
        { numero: 2, icone: '🔌', titulo: '2. Separe acessórios', descricao: 'Separe cabos, carregadores e capinhas, pois podem possuir processos de reciclagem distintos.' },
        { numero: 3, icone: '📍', titulo: '3. Leve ao ponto', descricao: 'Encontre o ecoponto ou caixa de coleta autorizada mais próxima no nosso mapa interativo.' },
        { numero: 4, icone: '🌿', titulo: '4. Preserve o meio ambiente', descricao: 'Evite que metais pesados como chumbo e mercúrio contaminem o solo e os lençóis freáticos.' }
      ],
      curiosidade: { titulo: 'Você sabe?', texto: 'Um único celular antigo descartado incorretamente pode contaminar milhares de litros de água devido à presença de metais pesados em seus componentes!' }
    },
    plastico: {
      idCategoria: 'plastico',
      nomeItem: 'Plástico',
      iconeItem: '🧴',
      etapas: [
        { numero: 1, icone: '🗑️', titulo: '1. Separe dos orgânicos', descricao: 'Coloque embalagens plásticas junto aos materiais recicláveis, longe de restos de comida.' },
        { numero: 2, icone: '🚿', titulo: '2. Esvazie e limpe', descricao: 'Retire o conteúdo e faça uma limpeza rápida para evitar mau cheiro e contaminação.' },
        { numero: 3, icone: '📦', titulo: '3. Reduza o volume', descricao: 'Amasse garrafas e empilhe embalagens para facilitar o transporte e a triagem.' },
        { numero: 4, icone: '♻️', titulo: '4. Encaminhe à coleta', descricao: 'Coloque os plásticos na coleta seletiva ou leve-os a uma cooperativa.' }
      ],
      curiosidade: { titulo: 'Você sabe?', texto: 'Muitos plásticos podem virar novos produtos, mas precisam chegar limpos e separados à cooperativa.' }
    },
    papel: {
      idCategoria: 'papel',
      nomeItem: 'Papel',
      iconeItem: '📄',
      etapas: [
        { numero: 1, icone: '📄', titulo: '1. Separe os papéis', descricao: 'Junte jornais, folhas, caixas e embalagens de papel que estejam em boas condições para reciclagem.' },
        { numero: 2, icone: '💧', titulo: '2. Mantenha seco', descricao: 'Não misture papel molhado, engordurado ou com restos de comida aos recicláveis.' },
        { numero: 3, icone: '📦', titulo: '3. Desmonte as caixas', descricao: 'Abra e achate caixas de papelão para ocupar menos espaço durante o transporte.' },
        { numero: 4, icone: '🚛', titulo: '4. Envie para a coleta', descricao: 'Coloque o papel na coleta seletiva ou entregue em uma cooperativa de reciclagem.' }
      ],
      curiosidade: { titulo: 'Você sabe?', texto: 'Reciclar uma tonelada de papel ajuda a economizar árvores, água e energia no processo de produção.' }
    },
    vidro: {
      idCategoria: 'vidro',
      nomeItem: 'Garrafas e potes de vidro',
      iconeItem: '🍼',
      etapas: [
        { numero: 1, icone: '🧤', titulo: '1. Proteja suas mãos', descricao: 'Use luvas para recolher cacos e nunca tente compactar o vidro com as mãos.' },
        { numero: 2, icone: '🚿', titulo: '2. Esvazie e lave', descricao: 'Retire os resíduos dos potes e garrafas antes de encaminhá-los.' },
        { numero: 3, icone: '📦', titulo: '3. Embale os cacos', descricao: 'Envolva vidros quebrados em papelão ou coloque-os em uma caixa resistente identificada.' },
        { numero: 4, icone: '♻️', titulo: '4. Leve ao ponto correto', descricao: 'Encaminhe o vidro à coleta seletiva ou a um ponto que aceite esse material.' }
      ],
      curiosidade: { titulo: 'Você sabe?', texto: 'O vidro pode ser reciclado várias vezes sem perder sua qualidade, reduzindo a extração de areia e outros minerais.' }
    },
    metal: {
      idCategoria: 'metal',
      nomeItem: 'Metal',
      iconeItem: '🥫',
      etapas: [
        { numero: 1, icone: '🗑️', titulo: '1. Separe os metais', descricao: 'Junte latas de alumínio, aço e outras embalagens metálicas aos recicláveis.' },
        { numero: 2, icone: '🚿', titulo: '2. Esvazie e limpe', descricao: 'Retire restos de alimentos e líquidos para evitar contaminação durante a triagem.' },
        { numero: 3, icone: '📦', titulo: '3. Reduza o volume', descricao: 'Amasse as latas com cuidado para facilitar o armazenamento e o transporte.' },
        { numero: 4, icone: '♻️', titulo: '4. Encaminhe à coleta', descricao: 'Leve os metais à coleta seletiva ou a uma cooperativa de reciclagem.' }
      ],
      curiosidade: { titulo: 'Você sabe?', texto: 'O alumínio pode ser reciclado muitas vezes e sua reciclagem economiza grande quantidade de energia.' }
    },
    organico: {
      idCategoria: 'organico',
      nomeItem: 'Resíduos orgânicos',
      iconeItem: '🍎',
      etapas: [
        { numero: 1, icone: '🍎', titulo: '1. Separe os restos', descricao: 'Separe cascas, frutas, verduras e outros resíduos orgânicos dos materiais recicláveis.' },
        { numero: 2, icone: '🗑️', titulo: '2. Use um recipiente adequado', descricao: 'Armazene os resíduos em um recipiente fechado para evitar odores e insetos.' },
        { numero: 3, icone: '🌱', titulo: '3. Faça compostagem', descricao: 'Sempre que possível, encaminhe os resíduos para uma composteira doméstica ou comunitária.' },
        { numero: 4, icone: '🌿', titulo: '4. Aproveite o adubo', descricao: 'Use o composto produzido para nutrir plantas e devolver nutrientes ao solo.' }
      ],
      curiosidade: { titulo: 'Você sabe?', texto: 'A compostagem transforma resíduos orgânicos em adubo e reduz a quantidade de lixo enviada aos aterros.' }
    }
  };

  readonly guiaAtual = computed(() =>
    this.dadosGuias[this.categoriaSelecionadaId()] || this.dadosGuias['plastico']
  );

  menuItens = [
    { rotulo: 'Início', link: '/inicio' },
    { rotulo: 'Guia', link: '/guia' },
    { rotulo: 'Mapa', link: '/mapa' },
    { rotulo: 'Login', link: '/login' }
  ];

  menuCabecalho: { rotulo: string; link: string }[] = [];

  constructor(private readonly router: Router) {}

  selecionarCategoria(id: string): void {
    this.categoriaSelecionadaId.set(id);
  }

  navegarParaMapa(): void {
    this.router.navigate(['/mapa']);
  }

  alternarMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu(): void {
    this.menuAberto = false;
  }
}