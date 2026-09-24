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

  email = '';
  senha = '';
  aceitouTermos = false;
  carregando = false;
  mensagemErro = '';

  constructor(private router: Router) {}

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

    console.log('Dados do formulário de login:', {
      email: this.email.trim(),
      senha: this.senha,
      aceitouTermos: this.aceitouTermos,
      dataHora: new Date().toISOString()
    });

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