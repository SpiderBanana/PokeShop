function fetchPokemonByType(type) {
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
        .then(response => response.json())
        .then(data => {
            const pokemonList = document.getElementById('pokemonList');
            pokemonList.innerHTML = ''; 

            data.pokemon.forEach(pokemonInfo => {
                fetch(pokemonInfo.pokemon.url)
                    .then(response => response.json())
                    .then(pokemonData => {
                        const card = document.createElement('a'); // Utilisez un élément 'a' pour le lien
                        card.href = `single.html?id=${pokemonData.id}`; // Ajoutez l'URL avec l'ID
                        card.classList.add('pokemon-card');
                        card.innerHTML = `
                            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                            <h3>${pokemonData.name}</h3>
                            <p>#${pokemonData.id}</p>
                            <p>Type: ${pokemonData.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                        `;
                        pokemonList.appendChild(card);
                    });
            });
        })
        .catch(error => console.error("Erreur lors de la récupération des Pokémon de type", type, ":", error));
        
}
fetchPokemonByType('water');



// Panier
function addToCart() {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.includes(pokemonId)) {
        cart.push(pokemonId);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert("Pokémon ajouté au panier !");
    } else {
        alert("Ce Pokémon est déjà dans votre panier.");
    }
}

// Fonction pour afficher les détails du Pokémon
function getPokemonDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => response.json())
        .then(data => {
            const detailsContainer = document.getElementById('pokemonDetails');

            // Affichage des détails du Pokémon
            detailsContainer.innerHTML = `
                <h1>${data.name}</h1>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p>#${data.id}</p>
                <p>Taille : ${data.height / 10} m</p>
                <p>Poids : ${data.weight / 10} kg</p>
                <p>Type(s) : ${data.types.map(type => type.type.name).join(', ')}</p>
                <p>Capacités : ${data.abilities.map(ability => ability.ability.name).join(', ')}</p>
                <p>Statistiques de base :</p>
                <ul>
                    ${data.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                </ul>
            `;

            // Vérifiez le type du Pokémon et ajoutez l'effet correspondant
            data.types.forEach(typeInfo => {
                switch (typeInfo.type.name) {
                    case 'water':
                        createRainEffect();
                        break;
                    case 'fire':
                        createFireEffect();
                        break;
                    case 'grass':
                        createLeafEffect();
                        break;
                    case 'electric':
                        createLightningEffect();
                        break;
                }
            });
        })
        .catch(error => console.error("Erreur lors de la récupération des détails du Pokémon:", error));
}


//fonction génération de gouttes
function createRainEffect() {
    for (let i = 0; i < 100; i++) {
        const drop = document.createElement('div');
        drop.classList.add('raindrop');
        drop.style.left = `${Math.random() * 100}vw`;
        drop.style.animationDuration = `${Math.random() * 2 + 1}s`;
        drop.style.animationDelay = `${Math.random() * 2}s`;
        document.body.appendChild(drop);
    }
}

//fonction génération de flammes
function createFireEffect() {
    for (let i = 0; i < 50; i++) {
        const flame = document.createElement('div');
        flame.classList.add('flame');
        flame.style.left = `${Math.random() * 100}vw`;
        flame.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
        flame.style.animationDelay = `${Math.random() * 2}s`;
        document.body.appendChild(flame);
    }
}

//fonction génération de feuilles
function createLeafEffect() {
    for (let i = 0; i < 50; i++) {
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        leaf.style.left = `${Math.random() * 100}vw`;
        leaf.style.animationDuration = `${Math.random() * 3 + 2}s`;
        leaf.style.animationDelay = `${Math.random() * 2}s`;
        document.body.appendChild(leaf);
    }
}

//fonction génération d'éclairs
function createLightningEffect() {
    for (let i = 0; i < 100; i++) {
        const drop = document.createElement('div');
        drop.classList.add('lightning');
        drop.style.left = `${Math.random() * 100}vw`;
        drop.style.animationDuration = `${Math.random() * 2 + 1}s`;
        drop.style.animationDelay = `${Math.random() * 2}s`;
        document.body.appendChild(drop);
    }
}


// Exécutez getPokemonDetails sur la page single
document.addEventListener('DOMContentLoaded', function() {
    getPokemonDetails();
});



