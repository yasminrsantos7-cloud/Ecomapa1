import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css']
})
export class Cadastro {
  menuAberto = false;
  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  aceitouTermos = false;
  carregando = false;
  mensagemErro = '';
  mensagemSucesso = '';

  menuItens = [
    { rotulo: 'Início', link: '/inicio' },
    { rotulo: 'Guia', link: '/guia' },
    { rotulo: 'Mapa', link: '/mapa' },
    { rotulo: 'Login', link: '/login' }
  ];

  menuCabecalho: { rotulo: string; link: string }[] = [];

  constructor(private router: Router) {}

  alternarMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu(): void {
    this.menuAberto = false;
  }

  cadastrarUsuario(event: SubmitEvent): void {
    event.preventDefault();
    this.mensagemErro = '';
    this.mensagemSucesso = '';

    if (!this.nome.trim()) {
      this.mensagemErro = 'Por favor, informe seu nome completo.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email.trim() || !emailRegex.test(this.email.trim())) {
      this.mensagemErro = 'Por favor, digite um e-mail válido.';
      return;
    }

    if (!this.senha || this.senha.length < 6) {
      this.mensagemErro = 'A senha deve conter no mínimo 6 dígitos.';
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.mensagemErro = 'As senhas não coincidem.';
      return;
    }

    if (!this.aceitouTermos) {
      this.mensagemErro = 'Você precisa aceitar os Termos de Uso e LGPD.';
      return;
    }

    this.carregando = true;


    setTimeout(() => {
      const novoUsuario = {
        nome: this.nome.trim(),
        email: this.email.trim(),
        senha: this.senha
      };

      localStorage.setItem('usuario_cadastrado', JSON.stringify(novoUsuario));
      this.mensagemSucesso = 'Cadastro realizado com sucesso! Redirecionando para o login...';
      this.carregando = false;

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    }, 1000);
  }
}