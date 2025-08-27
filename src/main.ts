import net from 'net';

const PORT: number = 8080;
const HOST: string = '127.0.0.1'

// 接続しているクライアントのソケットを保持する配列
const clients: net.Socket[] = [];

// サーバーインスタンスの作成
const server = net.createServer((socket) => {
    // クライアントが接続したときの処理
    console.log(`Client connected: ${socket.remoteAddress}:${socket.remotePort}`);
    socket.write('Welcome to the Echo Server!\n');

    // 接続しているクライアントのソケットを配列に追加
    clients.push(socket);

    socket.on('data', (data: Buffer) => {

        // クライアントからデータを受信したときの処理
        console.log(`Received data: ${data.toString}`);

        // 送信したクライアント以外のクライアントに送信
        for(const client of clients){
            if(client !== socket){
                client.write(`Broadcast from ${socket.remoteAddress}:${socket.remotePort}: ${data}`);
            }
        }
        
        // // クライアントからデータを受信したときの処理
        // console.log(`Received data: ${data.toString}`);
        // // クライアントにデータを送信
        // socket.write(`Echo: ${data}`);
    });
    // クライアントが切断したときの処理
    socket.on('end',() => {
        console.log(`Client disconnected: ${socket.remoteAddress}:${socket.remotePort}`);

        const index = clients.indexOf(socket);
        if (index !== -1) {
            clients.splice(index, 1);
        }
    })
    // エラーハンドリング
    socket.on('error',(err) => {
        console.error(`Socket error: ${err.message}`);
        const index = clients.indexOf(socket);
        if (index !== -1) {
            clients.splice(index, 1);
        }
        
    })
});

// サーバーの開始（待ち状態）
server.listen(PORT,HOST,() => {
    console.log(`Server listening on ${HOST}:${PORT}`);
})

server.on('error',(err) => {
     // サーバーエラーハンドリング
    console.error(`Server error: ${err.message}`);});

