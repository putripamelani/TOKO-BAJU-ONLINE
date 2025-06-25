// cart.js (untuk halaman keranjang)

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-btn');
    const emptyCartMessage = document.getElementById('empty-cart-message');

    // Fungsi untuk mendapatkan data keranjang dari localStorage
    const getCart = () => {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    };

    // Fungsi untuk menyimpan data keranjang ke localStorage
    const saveCart = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    // Fungsi untuk menghapus item dari keranjang
    const removeItemFromCart = (productId) => {
        let cart = getCart();
        cart = cart.filter(item => item.id !== productId);
        saveCart(cart);
        renderCart(); // Perbarui tampilan keranjang
    };

    // Fungsi untuk merender (menampilkan) item di keranjang
    const renderCart = () => {
        let cart = getCart();
        cartItemsContainer.innerHTML = ''; // Kosongkan konten sebelumnya
        let total = 0;

        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            checkoutButton.style.display = 'none';
        } else {
            emptyCartMessage.style.display = 'none';
            checkoutButton.style.display = 'block';
            cart.forEach(item => {
                const li = document.createElement('li');
                li.classList.add('cart-item');
                li.innerHTML = `
                    <span>${item.name} (${item.quantity}x)</span>
                    <span>Rp ${item.price.toLocaleString('id-ID')}</span>
                    <button data-id="${item.id}">Hapus</button>
                `;
                cartItemsContainer.appendChild(li);
                total += item.price * item.quantity;
            });
        }
        cartTotalElement.textContent = `Total: Rp ${total.toLocaleString('id-ID')}`;

        // Tambahkan event listener untuk tombol hapus
        document.querySelectorAll('.cart-item button').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                removeItemFromCart(productId);
            });
        });
    };

    // Panggil renderCart saat halaman keranjang dimuat
    renderCart();

    // Event listener untuk tombol checkout (ini akan membutuhkan back-end)
    checkoutButton.addEventListener('click', () => {
        alert('Fitur pembayaran belum diimplementasikan. Ini membutuhkan integrasi back-end dan payment gateway.');
        // Di sini Anda akan mengarahkan pengguna ke halaman pembayaran atau memproses pesanan
        // clearCart(); // Setelah berhasil pembayaran, kosongkan keranjang
    });
});