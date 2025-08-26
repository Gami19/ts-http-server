import net from 'net';

const PORT: number = 8080;
const HOST: string = '127.0.0.1'

// サーバーインスタンスの作成
const server = net.createServer((socket) => {
    // クライアントが接続したときの処理
    console.log(`Client connected: ${socket.remoteAddress}:${socket.remotePort}`);
    socket.on('data', (data: Buffer) => {
        // クライアントからデータを受信したときの処理
        console.log(`Received data: ${data.toString}`);
        // クライアントにデータを送信
        socket.write(`Echo: ${data}`);
    });
    // クライアントが切断したときの処理
    socket.on('end',() => {
        console.log(`Client disconnected: ${socket.remoteAddress}:${socket.remotePort}`);
    })
    // エラーハンドリング
    socket.on('error',(err) => {
        console.error(`Socket error: ${err.message}`);
    })

    // サーバーの開始（待ち状態）
    server.listen(PORT,HOST,() => {
        console.log(`Server listening on ${HOST}:${PORT}`);
    })

    server.on('error',(err) => {
        // サーバーエラーハンドリング
        console.error(`Server error: ${err.message}`);}

    )
});
