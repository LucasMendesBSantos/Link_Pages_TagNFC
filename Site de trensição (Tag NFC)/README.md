# React + Vite

Este projeto utiliza uma configuração mínima para rodar React com Vite, incluindo HMR e algumas regras do Oxlint.

Atualmente, dois plugins oficiais estão disponíveis:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) — utiliza o [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) — utiliza o [SWC](https://swc.rs/)

## React Compiler

O React Compiler não está habilitado neste template devido ao seu impacto no desempenho em desenvolvimento e build. Para adicioná-lo, consulte a [documentação oficial](https://react.dev/learn/react-compiler/installation).

## Expandindo a configuração do Oxlint

Se você estiver desenvolvendo uma aplicação para produção, recomendamos utilizar TypeScript com regras de lint com reconhecimento de tipos habilitadas. Consulte o [template TS](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) para saber como integrar TypeScript e as regras relacionadas ao TypeScript do Oxlint no seu projeto.
