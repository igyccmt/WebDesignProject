    let cart = [];
    function addToCart(productName, price) {
        cart.push({ productName, price });
        alert(`${productName} has been added to your cart.`);
        console.log(cart); // Debug için, sepete eklenen ürünleri gösterir.
    }
 
