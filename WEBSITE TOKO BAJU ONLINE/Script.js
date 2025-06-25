// script.js (untuk interaktivitas umum)

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Fungsi untuk mendapatkan data keranjang dari localStorage
    const getCart = () => {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    };

    // Fungsi untuk menyimpan data keranjang ke localStorage
    const saveCart = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    // Fungsi untuk menambahkan item ke keranjang
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.id;
            const productName = event.target.dataset.name;
            const productPrice = parseFloat(event.target.dataset.price);

            let cart = getCart();

            // Cek apakah produk sudah ada di keranjang
            const existingItemIndex = cart.findIndex(item => item.id === productId);

            if (existingItemIndex > -1) {
                // Jika sudah ada, tambahkan kuantitasnya
                cart[existingItemIndex].quantity += 1;
            } else {
                // Jika belum ada, tambahkan sebagai item baru
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            saveCart(cart);
            alert(`${productName} telah ditambahkan ke keranjang!`);
            // Opsional: Perbarui ikon keranjang di header
        });
    });
});