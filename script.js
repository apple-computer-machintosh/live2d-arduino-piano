document.addEventListener("DOMContentLoaded", function() {
    const keys = document.querySelectorAll('.key');
    const autoPlayButton = document.getElementById('auto-play');
    const patternSelect = document.getElementById('pattern-select');

    // 鍵盤のイベントリスナー
    keys.forEach(key => {
        let startTime;

        key.addEventListener('mousedown', function() {
            startTime = Date.now(); // 押下開始時間
        });

        key.addEventListener('mouseup', async function() {
            const duration = Date.now() - startTime; // 押下時間を計算
            const note = this.getAttribute('data-note');

            // ノートと長さをサーバーに送信
            try {
                const response = await fetch('http://localhost:3000/send-note', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ note: note, length: duration })
                });
                const data = await response.text();
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });

    // 自動演奏ボタンのイベントリスナー
    autoPlayButton.addEventListener('click', async function() {
        const selectedPattern = patternSelect.value; // 選択されたパターンを取得
        try {
            const response = await fetch(`http://localhost:3000/auto-play?pattern=${selectedPattern}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.text();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
