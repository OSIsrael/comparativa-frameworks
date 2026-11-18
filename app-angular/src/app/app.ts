import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TarjetaUsuario } from './tarjeta-usuario/tarjeta-usuario';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, TarjetaUsuario],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);

  usuarios: any[] = [];
  cargando = true;
  error = '';
  busqueda = '';
  soloFavoritos = false;
  favoritosIds = new Set<number>();

  ngOnInit() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users').subscribe({
      next: (datos) => {
        this.usuarios = datos;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar los usuarios desde la API.';
        this.cargando = false;
      }
    });
  }

  alternarFavorito(id: number) {
    if (this.favoritosIds.has(id)) {
      this.favoritosIds.delete(id);
    } else {
      this.favoritosIds.add(id);
    }
  }

  get usuariosFiltrados() {
    return this.usuarios.filter((u) => {
      const coincideNombre = u.name.toLowerCase().includes(this.busqueda.toLowerCase());
      const coincideFav = this.soloFavoritos ? this.favoritosIds.has(u.id) : true;
      return coincideNombre && coincideFav;
    });
  }
}