// Shopping Cart Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all product cards
    const productCards = document.querySelectorAll('.card-body');
    const totalPriceElement = document.querySelector('.total');
    
    // Initialize cart state
    let cart = [];
    let totalPrice = 0;

    // Add event listeners to each product card
    productCards.forEach((card, index) => {
        const plusButton = card.querySelector('.fa-plus-circle');
        const minusButton = card.querySelector('.fa-minus-circle');
        const deleteButton = card.querySelector('.fa-trash-alt');
        const heartButton = card.querySelector('.fa-heart');
        const quantityElement = card.querySelector('.quantity');
        const unitPriceElement = card.querySelector('.unit-price');
        const productTitle = card.querySelector('.card-title');
        
        // Extract unit price (remove $ and convert to number)
        const unitPrice = parseInt(unitPriceElement.textContent.replace('$', '').trim());
        
        // Initialize product in cart
        cart[index] = {
            name: productTitle.textContent,
            unitPrice: unitPrice,
            quantity: 0,
            isLiked: false
        };

        // Plus button functionality
        plusButton.addEventListener('click', function() {
            cart[index].quantity++;
            quantityElement.textContent = cart[index].quantity;
            updateTotalPrice();
        });

        // Minus button functionality
        minusButton.addEventListener('click', function() {
            if (cart[index].quantity > 0) {
                cart[index].quantity--;
                quantityElement.textContent = cart[index].quantity;
                updateTotalPrice();
            }
        });

        // Delete button functionality
        deleteButton.addEventListener('click', function() {
            cart[index].quantity = 0;
            quantityElement.textContent = cart[index].quantity;
            updateTotalPrice();
        });

        // Heart button functionality (toggle like)
        heartButton.addEventListener('click', function() {
            cart[index].isLiked = !cart[index].isLiked;
            if (cart[index].isLiked) {
                heartButton.style.color = '#e74c3c';
            } else {
                heartButton.style.color = 'black';
            }
        });
    });

    // Function to update total price
    function updateTotalPrice() {
        totalPrice = cart.reduce((total, item) => {
            return total + (item.unitPrice * item.quantity);
        }, 0);
        totalPriceElement.textContent = `${totalPrice} $`;
    }

    // Add hover effects for buttons
    const buttons = document.querySelectorAll('i');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});