const express = require('express');
const cors = require('cors');
const { SerialPort } = require('serialport');

const app = express();
const port = new SerialPort({
    path: 'COM5', // 使用するポート名に変更
    baudRate: 9600,
});

app.use(cors());
app.use(express.json());

port.on('error', (err) => {
    console.error('Error: ', err.message);
});

port.on('open', () => {
    console.log('Arduinoのポートが正常に起動しました');
});

port.on('data', (data) => {
    console.log(`Received: ${data}`);
});

const scales = [
    { note: "SCALE_C3", length: 500 },
    { note: "SCALE_D3", length: 500 },
    { note: "SCALE_E3", length: 500 },
    { note: "SCALE_F3", length: 500 },
    { note: "SCALE_G3", length: 500 },
    { note: "SCALE_A3", length: 500 },
    { note: "SCALE_B3", length: 500 },
    { note: "SCALE_C4", length: 500 }
];


// 音をループさせる
app.post('/loop', (req, res) => {
    const scale = req.body.scale;
    port.write(`LOOP_${scale}\n`, (err) => {
        if (err) {
            return res.status(500).send('Error on write: ' + err.message);
        }
        // console.log(`Sent: LOOP_${scale}`);
        res.send('Looping ' + scale);
    });
});

// 音のループを解除する
app.post('/stop', (req, res) => {
    port.write('STOP\n', (err) => {
        if (err) {
            return res.status(500).send('Error on write: ' + err.message);
        }
        // console.log('Sent: STOP');
        res.send('Stopped');
    });
});

// app.post('/send-note', (req, res) => {
//     const note = req.body.note; // クライアントから送信されたノート

//     if (note) {
//         port.write(`${note}\n`, (err) => { // lengthを送らない
//             if (err) {
//                 return res.status(500).send("データの転送が失敗しました");
//             }
//             console.log("データは無事転送されました");
//             res.status(200).send("データは無事転送されました");
//         });
//     } else {
//         res.status(400).send("ノートが提供されていません");
//     }
// });

// app.post('/stop-note', (req, res) => {
//     port.write(`STOP\n`, (err) => {
//         if (err) {
//             return res.status(500).send("音の停止に失敗しました");
//         }
//         console.log("音が停止されました");
//         res.status(200).send("音が停止されました");
//     });
// });


// 自動演奏をトリガーするエンドポイント
app.post('/auto-play', (req, res) => {
    const pattern = req.query.pattern; // URLからパターンを取得

    // コマンドをArduinoに送信
    port.write(`${pattern}\n`, (err) => {
        if (err) {
            return res.status(500).send("自動演奏のトリガーに失敗しました");
        }
        console.log("自動演奏がトリガーされました");
        res.status(200).send("自動演奏がトリガーされました");
    });
});

app.listen(3000, () => {
    console.log('サーバーがポート3000で起動しました');
});