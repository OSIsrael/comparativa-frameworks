import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TarjetaUsuario } from './tarjeta-usuario';

describe('TarjetaUsuario', () => {
  let component: TarjetaUsuario;
  let fixture: ComponentFixture<TarjetaUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaUsuario]
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaUsuario);
    component = fixture.componentInstance;
    component.usuario = {
      id: 7,
      name: 'Kurtis Weissnat',
      email: 'Telly.Hoeger@billy.biz',
      address: { city: 'Howemouth' }
    };
    fixture.detectChanges();
  });

  it('debe mostrar el nombre del usuario y emitir el id al hacer clic en Favorito', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Kurtis Weissnat');

    let idEmitido: number | undefined;
    component.toggleFavorito.subscribe((id) => (idEmitido = id));

    compiled.querySelector('button')?.click();
    expect(idEmitido).toBe(7);
  });
});