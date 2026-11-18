import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TarjetaUsuario from '../TarjetaUsuario.vue';

describe('TarjetaUsuario', () => {
  it('renderiza los datos del usuario y emite toggle-favorito al hacer clic', async () => {
    const usuarioPrueba = {
      id: 3,
      name: 'Clementine Bauch',
      email: 'Nathan@yesenia.net',
      address: { city: 'McKenziehaven' }
    };

    const wrapper = mount(TarjetaUsuario, {
      props: { usuario: usuarioPrueba, esFavorito: false }
    });

    expect(wrapper.text()).toContain('Clementine Bauch');
    expect(wrapper.text()).toContain('McKenziehaven');

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('toggle-favorito')).toBeTruthy();
    expect(wrapper.emitted('toggle-favorito')[0]).toEqual([3]);
  });
});