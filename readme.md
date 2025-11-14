#  Pokédex

##  O que essa Pokédex faz?

*   **Busca Rápida:** Dá para buscar qualquer Pokémon pelo **nome** ou **ID**.
*   **Lista Inicial:** Ao carregar, ela já mostra os **151 primeiros Pokémons**.
*   **Detalhes Completos:** Ao clicar ou buscar, você vê o **sprite**, **tipos**, **habilidades** e o **ID** do Pokémon.
*   **Sistema de Favoritos:** Você pode adicionar e remover Pokémons da sua lista de favoritos, mas não salva na lista.


##  Detalhando as Funcionalidades

| Funcionalidade      | Onde acontece no código?                     | Descrição                                                          |
| ------------------- | -------------------------------------------- | ------------------------------------------------------------------ |
| **Listagem inicial**| `app.js` (função `loadPokemons()`)          | Busca os 151 primeiros e renderiza os cards no painel esquerdo.     |
| **Busca**           | `app.js` (função `getPokemon()`)            | Pega o texto do input e faz a requisição. Se der 404, mostra uma mensagem de erro. |
| **Detalhes**        | `app.js` (função `showDetails()`)           | Pega os dados do Pokémon e monta o painel de detalhes (sprite, tipos, habilidades). |
| **Favoritos**       | `app.js` (array `favs[]` e lógica em `showDetails()`) | Adiciona/remove o Pokémon.                                |


##  Tecnologias Utilizadas

*   **HTML5:** A estrutura básica (`index.html`).
*   **CSS3:** Usei **Grid Layout** para fazer o layout principal de 3 colunas e deixar os cards bonitinhos.
*   **JavaScript Puro (Vanilla JS):** Toda a lógica de `fetch` da API, manipulação do DOM e gerenciamento dos favoritos.
*   **PokeAPI:** Link: `https://pokeapi.co`

##  Estrutura do Projeto

A estrutura é bem simples, focada no Front-End:

pokedex/

├── index.html      # Página principal

├── styles.css      # Estilos (Grid, cards)

├── app.js          # Lógica JavaScript

└── (assets gerados pela PokeAPI)

```

##  Como Rodar o Projeto

### Opção 1: Abrir Direto no Navegador 

Basta dar dois cliques no arquivo `index.html`. Como a PokeAPI é pública, não tem problema de CORS.

### Opção 2: Usar um Servidor Local 
Se você quiser simular um ambiente de desenvolvimento ou evitar qualquer problema de carregamento de arquivos:

1.  Certifique-se de ter o Node.js instalado.
2.  Abra o terminal na pasta do projeto (`/pokedex`).
3.  Execute o comando para subir um servidor simples:

    ```bash
    npx serve
    ```

4.  Acesse o link que aparecer no terminal, geralmente: `http://localhost:3000`


