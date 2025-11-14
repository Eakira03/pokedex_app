var searchInput = document.getElementById("search-input");
var searchBtn = document.getElementById("search-btn");
var list = document.getElementById("results-list"); 
var details = document.getElementById("pokemon-details");
var favList = document.getElementById("favorites-list");

var favs = []; 

var resultsList = document.getElementById("results-list");

function loadPokemons() {
  resultsList.innerHTML = "<p>Carregando...</p>";

  fetch('https://pokeapi.co/api/v2/pokemon?limit=151' )
    .then(function(response) {
      return response.json(); 
    })
    .then(async function(data) {
      resultsList.innerHTML = "";

      var pokemons = data.results;

      for (var i = 0; i < pokemons.length; i++) {
        var pokemon = pokemons[i];

        var res = await fetch(pokemon.url);
        var pokemonData = await res.json();

        var name = pokemonData.name;
        var id = pokemonData.id;
        var sprite = pokemonData.sprites.front_default;

        var capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

        resultsList.innerHTML += `
          <article class="pokemon-card">
            <img src="${sprite}" alt="${name}">
            <div>
              <h3>${capitalizedName}</h3>
              <p>#${id}</p>
            </div>
          </article>
        `;
      }
    })
    .catch(function(error) {
      resultsList.innerHTML = "<p style='color: red;'>Ocorreu um erro ao buscar os Pokémons.</p>";
      console.log(error); 
    });
}

loadPokemons();




searchBtn.onclick = function() {
  var text = searchInput.value;
  if (text != "") {
    getPokemon(text.toLowerCase());
  }
}


function getPokemon(name) {
  list.innerHTML = "<p>Carregando...</p>"; 

  fetch("https://pokeapi.co/api/v2/pokemon/" + name )
    .then(function(response) {
      if (response.status == 404) {
        list.innerHTML = '<p style="color:red;">Não achei o pokémon ' + name + '</p>';
        details.innerHTML = '<h2>Detalhes</h2><p>Nenhum pokémon encontrado.</p>';
      } else {
        return response.json();
      }
    })
    .then(function(data) {
      if (data) {
        list.innerHTML = "";

        var card = document.createElement("article");
        card.className = "pokemon-card";

        var is_fav = false;
        for (var i = 0; i < favs.length; i++) {
          if (favs[i].id == data.id) {
            is_fav = true;
          }
        }

        card.innerHTML = `
          <img src="${data.sprites.front_default}" alt="${data.name}">
          <h3>${data.name}</h3>
          <p>#${data.id}</p>
          <button class="fav-btn">${is_fav ? "★" : "☆"}</button>
        `;

        card.addEventListener("click", function() {
          showDetails(data);
        });

        list.appendChild(card);

        showDetails(data);
      }
    }); 
}

function showDetails(pokemonData) {
  var types = "";
  for (var i = 0; i < pokemonData.types.length; i++) {
    types += "<li>" + pokemonData.types[i].type.name + "</li>";
  }

  var abilities = "";
  for (var i = 0; i < pokemonData.abilities.length; i++) {
    abilities += "<li>" + pokemonData.abilities[i].ability.name + "</li>";
  }

  var is_fav = false;
  for (var i = 0; i < favs.length; i++) {
    if (favs[i].id == pokemonData.id) {
      is_fav = true;
    }
  }

  details.innerHTML = `
    <h2>Detalhes do Pokémon</h2>
    <img src="${pokemonData.sprites.front_default}">
    <h3>${pokemonData.name}</h3>
    <p>#${pokemonData.id}</p>
    <h4>Tipos</h4>
    <ul>${types}</ul>
    <h4>Habilidades</h4>
    <ul>${abilities}</ul>
    <button id="details-fav-btn">${is_fav ? "Remover" : "Adicionar"}</button>
  `;

  document.getElementById("details-fav-btn").onclick = function() {
    var exists = false;
    var index = -1;
    for (var i = 0; i < favs.length; i++) {
      if (favs[i].id == pokemonData.id) {
        exists = true;
        index = i;
      }
    }

    if (exists) {
      favs.splice(index, 1);
    } else {
      favs.push({
        id: pokemonData.id,
        name: pokemonData.name,
      });
    }
    
    getPokemon(pokemonData.name);
    showFavs();
  }
}


