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

app.post('/send-note', (req, res) => {
    const note = req.body.note; // クライアントから送信されたノート
    const length = req.body.length || 100; // デフォルトの長さを100msに設定

    if (note) {
        port.write(`${note},${length}\n`, (err) => {
            if (err) {
                return res.status(500).send("データの転送が失敗しました");
            }
            console.log("データは無事転送されました");
            res.status(200).send("データは無事転送されました");
        });
    } else {
        res.status(400).send("ノートが提供されていません");
    }
});

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