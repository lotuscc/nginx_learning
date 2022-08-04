const http = require('http')

const hostname = '127.0.0.1'
const port = 3000

let ips = new Array()

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Access-Control-Allow-Origin', '*')    

    let data = ''
    req.on('data', chunk => {
        data += chunk
    })
    req.on('end', () => {
        let url = new URL(req.url, `http://${req.headers['host']}`)
        console.log(url)

        if(url.pathname == '/query'){
            // 查询请求
            // 获取查询IP
            let query_ip = url.searchParams.get('ip')
            console.log('query ip: ', query_ip)
            
            let query_result = false

            // 查询数组中是否存在
            ips.forEach(v => {
                console.log(v)
                if(v == query_ip){
                    query_result = true
                }
            });

            console.log('query_result: ', query_result)
            
            // 返回查询结果
            if(query_result == true){
                res.end('ip_true')
            }else{
                res.end('ip_false')
            }
        }else if(url.pathname == '/register'){
            // 注册请求，将请求IP加入数组
            ips.push(url.hostname);

            res.end('done')
        }else{
            res.end('invalid')
        }
    })

})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})

