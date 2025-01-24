import { createBrowserRouter } from 'react-router-dom';

export function createRouter() {
  return createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const { TypeCalculator } = await import('./TypeCalculator');
        return { Component: TypeCalculator };
      },
    },
    {
      path: '/type-calculator',
      lazy: async () => {
        const { TypeCalculator } = await import('./TypeCalculator');
        return { Component: TypeCalculator };
      },
    },
    {
      path: '/pokedex',
      lazy: async () => {
        const { Pokedex } = await import('./Pokedex');
        return { Component: Pokedex };
      },
    },
    {
      path: '/team-builder',
      lazy: async () => {
        const { TeamBuilder } = await import('./TeamBuilder');
        return { Component: TeamBuilder };
      },
    },
  ]);
}
