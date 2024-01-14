function removeFromCart(pokemonId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(id => id != pokemonId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); 
}
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    cart.forEach(pokemonId => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(response => response.json())
            .then(data => {
                const pokemonCard = document.createElement('div');
                pokemonCard.innerHTML = `
                    <h3>${data.name}</h3>
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                    <button id="remove-${pokemonId}">Supprimer du panier</button>
                `;
                cartItemsContainer.appendChild(pokemonCard);

                document.getElementById(`remove-${pokemonId}`).addEventListener('click', function() {
                    removeFromCart(pokemonId);
                });
            });
    });
}


document.addEventListener('DOMContentLoaded', loadCart);
