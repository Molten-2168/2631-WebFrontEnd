var w = undefined; // Biến lưu trữ đối tượng Web Worker

function startWorker() {
    // 1. Kiểm tra hỗ trợ Web Worker
    if (typeof(Worker) === "undefined") {
        alert("Trình duyệt của bạn không hỗ trợ Web Worker!");
        return;
    }

    var n1 = parseFloat(document.getElementById("num1").value);
    var n2 = parseFloat(document.getElementById("num2").value);

    if (isNaN(n1) || isNaN(n2)) {
        alert("Vui lòng nhập đầy đủ 2 số hợp lệ!");
        return;
    }

    // 2. Dừng worker cũ nếu đang chạy
    if (w !== undefined) {
        w.terminate();
    }

    // 3. Khởi tạo Worker từ tệp worker.js
    w = new Worker("worker.js");

    // 4. Gửi 2 số sang Worker để bắt đầu tính toán
    w.postMessage({ num1: n1, num2: n2 });

    // 5. Nhận kết quả từ Worker và in ra màn hình
    w.onmessage = function (event) {
        document.getElementById("result").innerText = event.data;
    };
}

function stopWorker() {
    if (w !== undefined) {
        // Hủy tiến trình chạy ngầm của worker
        w.terminate();
        w = undefined;
        document.getElementById("result").innerText += " (Đã dừng worker)";
    }
}