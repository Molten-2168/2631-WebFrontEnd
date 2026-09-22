// Hàm tính và cập nhật hiển thị Tổng sản phẩm và Tổng tiền từ sessionStorage
function updateSummary() {
    var cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    var totalQty = 0;
    var totalPrice = 0;

    for (var i = 0; i < cart.length; i++) {
        totalQty += cart[i].quantity;
        totalPrice += cart[i].quantity * cart[i].price;
    }

    document.getElementById("totalQuantity").innerText = totalQty;
    document.getElementById("totalPrice").innerText = totalPrice;
}

// Hàm xử lý thêm sản phẩm vào giỏ hàng
function addToCart() {
    var id = document.getElementById("productId").value.trim();
    var name = document.getElementById("productName").value.trim();
    var quantity = parseInt(document.getElementById("quantity").value);
    var price = parseFloat(document.getElementById("price").value);

    // Kiểm tra tính hợp lệ của dữ liệu
    if (!id || !name || isNaN(quantity) || isNaN(price)) {
        alert("Vui lòng nhập đầy đủ thông tin sản phẩm!");
        return;
    }

    // Lấy giỏ hàng từ sessionStorage
    var cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    // Kiểm tra sản phẩm đã có trong giỏ hay chưa để cộng dồn số lượng
    var found = false;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity += quantity;
            cart[i].price = price;
            found = true;
            break;
        }
    }

    // Nếu chưa có, thêm mới sản phẩm vào mảng
    if (!found) {
        cart.push({
            id: id,
            name: name,
            quantity: quantity,
            price: price
        });
    }

    // Lưu giỏ hàng ngược lại vào sessionStorage
    sessionStorage.setItem("cart", JSON.stringify(cart));

    // Cập nhật lại số liệu hiển thị trên màn hình
    updateSummary();
}
