var timer = null;

// Lắng nghe dữ liệu gửi từ luồng chính
self.onmessage = function (e) {
    var num1 = e.data.num1;
    var num2 = e.data.num2;

    // Phép tính cộng ban đầu
    var currentSum = num1 + num2;

    // Gửi kết quả đầu tiên về luồng chính
    self.postMessage(currentSum);

    // Cứ sau 5 giây cộng dồn tiếp với num2 và gửi kết quả về
    timer = setInterval(function () {
        currentSum += num2;
        self.postMessage(currentSum);
    }, 5000);
};