const input = "B3 B3 C4 D3 D3 C4 B3 A3 G3 G3 A3 B3 B3 A3 A3";

// 文字を分割して配列にする
const items = input.split(" ");

// 出力形式に変換する（長さを固定で100にする）
const output = items.map(item => {
    return [`SCALE_${item}`, 100];
});

// コンソールに出力
console.log(output);
