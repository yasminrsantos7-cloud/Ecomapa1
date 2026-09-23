import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  @Output() loginSucesso = new EventEmitter<void>();

  menuAberto = false;
  email = '';
  senha = '';
  aceitouTermos = false;
  carregando = false;
  mensagemErro = '';

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

  fazerLogin(event: SubmitEvent): void {
    event.preventDefault();
    this.mensagemErro = '';

    if (!this.aceitouTermos) {
      this.mensagemErro = 'Você deve concordar com os Termos e Políticas da LGPD para entrar.';
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

    this.carregando = true;

    sessionStorage.setItem('autenticado', 'true');
    sessionStorage.setItem('usuarioEmail', this.email.trim());

    this.loginSucesso.emit();
    this.router.navigate(['/inicio']).finally(() => {
      this.carregando = false;
    });
  }

  irParaCadastro(): void {
    this.router.navigate(['/cadastro']);
  }
}