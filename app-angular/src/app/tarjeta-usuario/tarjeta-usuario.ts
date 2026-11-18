import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tarjeta-usuario',
  standalone: true,
  templateUrl: './tarjeta-usuario.html',
  styleUrl: './tarjeta-usuario.css'
})
export class TarjetaUsuario {
  @Input() usuario: any;
  @Input() esFavorito = false;
  @Output() toggleFavorito = new EventEmitter<number>();

  marcarFavorito() {
    this.toggleFavorito.emit(this.usuario.id);
  }
}