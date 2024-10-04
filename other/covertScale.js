// 音階とSCALEのマッピング
const scaleMap = {
    'ど': 'SCALE_C3',
    'れ': 'SCALE_D3',
    'み': 'SCALE_E3',
    'ふぁ': 'SCALE_F3',
    'そ': 'SCALE_G3',
    'ら': 'SCALE_A3',
    'らs': 'SCALE_A_SHARP3',
    'し': 'SCALE_B3',
    'どh': 'SCALE_C4',
    'れh': 'SCALE_D4',
    'そh': 'SCALE_G4',
    '_': 'SCALE_NONE' // "_"をSCALE_NONEにマッピング
};

function replaceScale(inputList) {
    return inputList.map(line => {
        let outputArray = [];
        let i = 0;

        while (i < line.length) {
            let matchFound = false;

            // 2文字のマッチを試みる
            if (i + 1 < line.length) {
                const twoChar = line.substring(i, i + 2);
                if (scaleMap[twoChar]) {
                    outputArray.push(scaleMap[twoChar]);
                    i += 2;
                    matchFound = true;
                }
            }

            // 1文字のマッチを試みる
            if (!matchFound) {
                const oneChar = line[i];
                if (scaleMap[oneChar]) {
                    outputArray.push(scaleMap[oneChar]);
                }
                i++;
            }
        }

        return outputArray.join(', '); // 各行をカンマ区切りで結合
    }).join('\n'); // 行ごとに改行して結合
}

// 使用例
const input = [
    'れそどしそh_',
    'そしそそしそそみそみhれhしbらそらそ_',
    'れそれそらしどhれhしらそし_',
    'しそそしそみそみhれhしbらそらそ_',
    'しどhどhしどhどhらみhれhしれhれhみh',
    'しそそしそそみみそみhれhしbらそらそ_',
    'れそれそらしどhれhしらそし_',
    'しそそしそそみそみhれhしbらそらそ_',
    'それそれれそそそそそそそそれhみhれhれh_',
    'そ_れそそれそそれふぁふぁふぁそらそそ',
];

const output = replaceScale(input);
console.log(output);
