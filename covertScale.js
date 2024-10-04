function convertScale(notes) {
    // 音階とSCALEのマッピング
    const scaleMap = {
        "そ": 'SCALE_G2',
        'ど': 'SCALE_C3',
        'れ': 'SCALE_D3',
        'み': 'SCALE_E3',
        'ふぁ': 'SCALE_F3',
        'そ': 'SCALE_G3',
        'ら': 'SCALE_A3',
        'らs': 'SCALE_A_SHARP3',
        'し': 'SCALE_B3',
        '_': 'SCALE_NONE' // "_"をSCALE_NONEにマッピング
    };

    // 有効な音階のリスト
    const validNotes = ['そl', 'ど', 'れ', 'み', 'ふぁ', 'そ', 'ら', 'らs', 'し', '_'];

    // 各音階の検証
    for (const note of notes) {
        if ((note.length !== 1 && note !== 'ふぁ' && note !== 'らs' && note != 'そl') || !validNotes.includes(note)) {
            throw new Error(`無効な音階: ${note}. 有効な音階は「そl」「ど」「れ」「み」「ふぁ」「そ」「ら」「らs」「し」または「_」です。`);
        }
    }

    // 音階を変換
    const convertedScales = notes.map(note => scaleMap[note] || note);
    
    // 6列ごとに段落を変えて出力
    let output = '';
    for (let i = 0; i < convertedScales.length; i++) {
        output += convertedScales[i];
        if (i < convertedScales.length - 1) {
            output += ', ';
        }
        // 6列ごとに改行
        if ((i + 1) % 6 === 0) {
            output += '\n';
        }
    }

    console.log(output);
}

// 使用例
const input = [
    "み", "み", "ふぁ", "そ", "そ", "ふぁ", "み", "れ",
    "ど", "ど", "れ", "み", "み", "れ", "れ",
    "み", "み", "ふぁ", "そ", "そ", "ふぁ", "み", "れ",
    "ど", "ど", "れ", "み", "れ", "ど", "ど",

    "れ", "れ", "み", "ど", "れ", "み", "ふぁ", "み", "ど",
    "れ", "み", "ふぁ", "み", "れ", "ど", "れ", "そl",
    "み", "み", "ふぁ", "そ", "そ", "ふぁ", "み", "れ",
    "ど", "ど", "れ", "み", "れ", "ど", "ど"
];

try {
    convertScale(input);
} catch (error) {
    console.error(error.message);
}

console.log(input.length);