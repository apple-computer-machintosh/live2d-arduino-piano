// 元の数字の配列
const numbers = [
    50,50,50,50,50,100,50,50,100,50,100,
];

const halvedNumbers = numbers.map(num => Math.floor(num * 100) * 2 / 100);

console.log("[");
halvedNumbers.forEach((num, index) => {
    const output = num % 1 === 0 ? Math.floor(num) : num.toFixed(2);
    process.stdout.write(output.toString());
    if (index < halvedNumbers.length - 1) {
        process.stdout.write(", ");
    }
    if ((index + 1) % 100 === 0 && index !== halvedNumbers.length - 1) { // 8個ごとに改行
        console.log();
    }
});
console.log();
console.log("]");

// console.log(numbers.length)
// console.log(quarteredNumbers.length)

// 2:09

// "れ", "ふぁ", "そ", "そ", "ら", "ら", "_", "ら", "ど", "れ", "そ", "ふぁ", "ら", "_", "れ", "ふぁ", "そ", "そ", "ら", "ら", "_", "ら", "らs", "ら", "そ", "ふぁ", "ふぁ", "_", "れ", "ふぁ", "_", "そ", "ら", "ら", "_", "ら", "ど", "れ", "そ", "ふぁ", "ら", "_", "れ", "ふぁ", "そ", "ら", "み", "ど", "れ", "_", "れ", "ふぁ", "そ", "そ", "ら", "ら", "_", "ら", "ど", "れ", "そ", "ふぁ", "ら", "_", "れ", "ふぁ", "そ", "そ", "ら", "ら", "_", "ら", "らs", "ら", "そ", "ふぁ", "ふぁ", "_", "れ", "ふぁ", "そ", "そ", "ら", "ら", "_", "だ", "ど", "れ", "そ", "ふぁ", "ら", "_", "れ", "ふぁ", "らs", "ら", "そ", "ふぁ", "そ", "ふぁ", "ら", "ど", "れ"
