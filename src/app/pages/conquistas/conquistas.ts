import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface Badge {
  id: string;
  titulo: string;
  descricao: string;
  desbloqueado: boolean;
  dataDesbloqueio?: string;
  progresso: number; 
}

export interface HistoricoDescarte {
  id: string;
  data: string;
  material: string;
  pontoColeta: string;
  pontosGanhos: number;
}

export interface PerfilUsuario {
  nome: string;
  nivel: number;
  xpAtual: number;
  xpProximoNivel: number;
  pontosAcumulados: number;
  totalDescartes: number;
  estagioHorta: string;
  iconeHorta: string;
}

@Component({
  selector: 'app-conquistas',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './conquistas.html',
  styleUrls: ['./conquistas.css']
})
export class Conquistas implements OnInit {
  menuAberto = false;

  menuItens = [
    { rotulo: 'Início', link: '/inicio' },
    { rotulo: 'Guia', link: '/guia' },
    { rotulo: 'Mapa', link: '/mapa' },
    { rotulo: 'Conquistas', link: '/conquistas' },
    { rotulo: 'Login', link: '/login' }
  ];

  perfil: PerfilUsuario = {
    nome: 'Novo Eco Cidadão',
    nivel: 1,
    xpAtual: 0,
    xpProximoNivel: 100,
    pontosAcumulados: 0,
    totalDescartes: 0,
    estagioHorta: 'Semente Plantada',
    iconeHorta: '🌰'
  };

  pontosColeta = [
    { nome: 'Ecoponto Ladeira da Praça', endereco: 'Ladeira da Praça, 27 - Centro Histórico' },
    { nome: 'Ecoponto Portão da Piedade', endereco: 'R. Portão da Piedade, 155 - Dois de Julho' },
    { nome: 'Ecoponto Conselheiro Junqueira Ayres', endereco: 'Rua Conselheiro Junqueira Ayres, 165 - Barris' },
    { nome: 'Ecoponto Vasco da Gama', endereco: 'Av. Vasco da Gama, 437 - Engenho Velho de Brotas' },
    { nome: 'Ecoponto Granjas Rurais', endereco: 'R. da Mauritânia, 4 - Granjas Rurais' },
    { nome: 'Ponto de Pilhas Conselheiro Junqueira Ayres', endereco: 'Rua Conselheiro Junqueira Ayres, 8 - Barris' },
    { nome: 'Ponto de Pilhas Almeida Couto', endereco: 'Praça Conselheiro Almeida Couto, 6 - Nazaré' },
    { nome: 'Ponto de Pilhas Frederico Costa', endereco: 'R. Frederico Costa, 123 - Brotas' },
    { nome: 'Ponto de Pilhas Conselheiro Junqueira Ayres 2', endereco: 'Rua Conselheiro Junqueira Ayres, 8 - Barris' },
    { nome: 'Ponto de Pilhas Sete de Setembro', endereco: 'Av. Sete de Setembro, 122 - Centro' },
    { nome: 'Ponto de Medicamentos Miguel Calmon', endereco: 'R. Miguel Calmon, 37 - Comércio' },
    { nome: 'Ponto de Medicamentos Joana Angélica', endereco: 'Av. Joana Angélica, 924 - Nazaré' },
    { nome: 'Ponto de Medicamentos Joana Angélica 2', endereco: 'Av. Joana Angélica, 924 - Nazaré' },
    { nome: 'Ponto de Medicamentos Sabino Silva', endereco: 'R. Prof. Sabino Silva, 674 - Ondina' },
    { nome: 'Ponto de Medicamentos Dom João VI', endereco: 'Av. Dom João VI, 446 - Candeal' },
    { nome: 'Ponto de Metais Porto Seco', endereco: 'Rodovia BR-324, Km 618 - Porto Seco' },
    { nome: 'Ponto de Metais R. Chile', endereco: 'R. Chile, 15 - Centro Histórico' },
    { nome: 'Ponto de Metais Nova República', endereco: 'Av. Nova República, 489 - Pituba' },
    { nome: 'Ponto de Metais Tancredo Neves', endereco: 'Av. Tancredo Neves, 3133 - Caminho das Árvores' },
    { nome: 'Ponto de Plásticos Aloísio de Carvalho Filho', endereco: 'R. Prof. Aloísio de Carvalho Filho, 74 - Engenho Velho de Brotas' },
    { nome: 'Ponto de Plásticos Nova República', endereco: 'R. Nova República, 423 - Santa Cruz' },
    { nome: 'Ponto de Plásticos Nova República 2', endereco: 'Av. Nova República, 489 - Pituba' },
    { nome: 'Ponto de Plásticos Mauritânia', endereco: 'R. da Mauritânia, 4 - Granjas Rurais' },
    { nome: 'Ponto de Papel Ladeira da Independência', endereco: 'Ladeira da Independência, 57 - Tororó' },
    { nome: 'Ponto de Papel Cônego Pereira', endereco: 'R. Cônego Pereira, 179 - Barbalho' },
    { nome: 'Ponto de Papel Porto Seco', endereco: 'Rodovia BR-324, Km 618 - Porto Seco' },
    { nome: 'Ponto de Papel Aloísio de Carvalho Filho', endereco: 'R. Prof. Aloísio de Carvalho Filho, 74 - Engenho Velho de Brotas' },
    { nome: 'Ponto de Papel Cônego Pereira 2', endereco: 'R. Cônego Pereira, 179 - Barbalho' },
    { nome: 'Ponto de Vidro Santos Titara', endereco: 'R. Santos Titara, 22 - Massaranduba' },
    { nome: 'Ponto de Vidro Santos Titara 2', endereco: 'R. Santos Titara, 22 - Massaranduba' },
    { nome: 'Ponto de Vidro Ladeira da Independência', endereco: 'Ladeira da Independência, 57 - Tororó' },
    { nome: 'Ponto de Vidro Aloísio de Carvalho Filho', endereco: 'R. Prof. Aloísio de Carvalho Filho, 74 - Engenho Velho de Brotas' },
    { nome: 'Ponto de Vidro Aloísio de Carvalho Filho 2', endereco: 'R. Prof. Aloísio de Carvalho Filho, 74 - Engenho Velho de Brotas' }
  ];

  badges: Badge[] = [
    {
      id: '1',
      titulo: 'Primeiro Passo',
      descricao: 'Realize o seu 1º descarte no aplicativo.',
      desbloqueado: false,
      progresso: 0
    },
    {
      id: '2',
      titulo: 'Amigo do Meio Ambiente',
      descricao: 'Acumule 500 pontos em descartes.',
      desbloqueado: false,
      progresso: 0
    },
    {
      id: '3',
      titulo: 'Guardião da Natureza',
      descricao: 'Realize 10 descartes de resíduos.',
      desbloqueado: false,
      progresso: 0
    },
    {
      id: '4',
      titulo: 'Embaixador da Reciclagem',
      descricao: 'Alcance o nível 5 e acumule 1.000 pontos.',
      desbloqueado: false,
      progresso: 0
    }
  ];

  historico: HistoricoDescarte[] = [];

  materialSelecionado = 'Plástico (🍾)';
  pontoSelecionado = 'Ecoponto Ladeira da Praça - Ladeira da Praça, 27 - Centro Histórico';

  ngOnInit(): void {
    this.carregarDadosDoNavegador();
  }

  private obterPontosPorMaterial(material: string): number {
    if (material.includes('Eletrônicos')) return 200;
    if (material.includes('Vidro')) return 150;
    if (material.includes('Metal')) return 120;
    if (material.includes('Plástico')) return 100;
    if (material.includes('Papel')) return 80;
    return 100;
  }

  registrarDescarte(
    material: string = this.materialSelecionado,
    ponto: string = this.pontoSelecionado
  ): void {
    const pontosGanhos = this.obterPontosPorMaterial(material);

    this.perfil.totalDescartes += 1;
    this.perfil.pontosAcumulados += pontosGanhos;
    this.perfil.xpAtual += pontosGanhos;

    const novoRegistro: HistoricoDescarte = {
      id: Date.now().toString(),
      data: new Date().toLocaleDateString('pt-BR'),
      material,
      pontoColeta: ponto,
      pontosGanhos
    };
    this.historico.unshift(novoRegistro);

    while (this.perfil.xpAtual >= this.perfil.xpProximoNivel) {
      this.perfil.xpAtual -= this.perfil.xpProximoNivel;
      this.perfil.nivel += 1;
      this.perfil.xpProximoNivel = Math.round(this.perfil.xpProximoNivel * 1.5);
    }

    this.atualizarHorta();
    this.atualizarBadges();
    this.salvarDadosNoNavegador();
  }

  atualizarHorta(): void {
    if (this.perfil.nivel === 1) {
      if (this.perfil.totalDescartes === 0) {
        this.perfil.estagioHorta = 'Semente Plantada';
        this.perfil.iconeHorta = '🌰';
      } else {
        this.perfil.estagioHorta = 'Primeiros Brotos';
        this.perfil.iconeHorta = '🌱';
      }
    } else if (this.perfil.nivel === 2) {
      this.perfil.estagioHorta = 'Muda em Crescimento';
      this.perfil.iconeHorta = '🪴';
    } else if (this.perfil.nivel === 3) {
      this.perfil.estagioHorta = 'Planta Com Flores';
      this.perfil.iconeHorta = '🌸';
    } else {
      this.perfil.estagioHorta = 'Árvore Frutífera Aterrada';
      this.perfil.iconeHorta = '🌳';
    }
  }

  atualizarBadges(): void {
    const b1 = this.badges.find(b => b.id === '1');
    if (b1) {
      b1.progresso = Math.min((this.perfil.totalDescartes / 1) * 100, 100);
      if (this.perfil.totalDescartes >= 1 && !b1.desbloqueado) {
        b1.desbloqueado = true;
        b1.dataDesbloqueio = new Date().toLocaleDateString('pt-BR');
      }
    }

    const b2 = this.badges.find(b => b.id === '2');
    if (b2) {
      b2.progresso = Math.min((this.perfil.pontosAcumulados / 500) * 100, 100);
      if (this.perfil.pontosAcumulados >= 500 && !b2.desbloqueado) {
        b2.desbloqueado = true;
        b2.dataDesbloqueio = new Date().toLocaleDateString('pt-BR');
      }
    }

    const b3 = this.badges.find(b => b.id === '3');
    if (b3) {
      b3.progresso = Math.min((this.perfil.totalDescartes / 10) * 100, 100);
      if (this.perfil.totalDescartes >= 10 && !b3.desbloqueado) {
        b3.desbloqueado = true;
        b3.dataDesbloqueio = new Date().toLocaleDateString('pt-BR');
      }
    }

    const b4 = this.badges.find(b => b.id === '4');
    if (b4) {
      const progNivel = (this.perfil.nivel / 5) * 50;
      const progPontos = (this.perfil.pontosAcumulados / 1000) * 50;
      b4.progresso = Math.min(Math.round(progNivel + progPontos), 100);
      if (this.perfil.nivel >= 5 && this.perfil.pontosAcumulados >= 1000 && !b4.desbloqueado) {
        b4.desbloqueado = true;
        b4.dataDesbloqueio = new Date().toLocaleDateString('pt-BR');
      }
    }
  }

  calcularPorcentagemXp(): number {
    if (this.perfil.xpProximoNivel === 0) return 0;
    return Math.min(Math.round((this.perfil.xpAtual / this.perfil.xpProximoNivel) * 100), 100);
  }

  salvarDadosNoNavegador(): void {
    const dados = {
      perfil: this.perfil,
      badges: this.badges,
      historico: this.historico
    };
    localStorage.setItem('ecomapa_conquistas_dados', JSON.stringify(dados));
  }

  carregarDadosDoNavegador(): void {
    const dadosSalvos = localStorage.getItem('ecomapa_conquistas_dados');
    if (dadosSalvos) {
      try {
        const parsed = JSON.parse(dadosSalvos);
        this.perfil = parsed.perfil || this.perfil;
        this.badges = parsed.badges || this.badges;
        this.historico = parsed.historico || [];
      } catch (e) {
        console.error('Erro ao carregar dados salvos', e);
      }
    }
  }

  resetarProgresso(): void {
    if (confirm('Deseja zerar todo o seu progresso?')) {
      localStorage.removeItem('ecomapa_conquistas_dados');
      window.location.reload();
    }
  }

  alternarMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu(): void {
    this.menuAberto = false;
  }
}