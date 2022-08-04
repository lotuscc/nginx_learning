
// since 0.7.0
async function lotuscc_fetch(r) {  
    let reply = await ngx.fetch('http://127.0.0.1:3000/query?ip=' + r.remoteAddress);
    let query_result = await reply.text();  

    // 说明不知道能否连接外网
    if(query_result == 'ip_false'){        

        // 特殊请求头，没有设置gzip编码，方便添加数据
        let fetch_option = {
            method: 'GET',
    
            headers: {
                'Accept-Encoding' : '',
            }
        };

        let reply = await ngx.fetch('http://127.0.0.1:8080/index.html', fetch_option);
        let body = await reply.text();
        
        let fs = require('fs')
        let script = fs.readFileSync('/home/lotuscc/git_test/newborn_learning/2022-07-14/isOutside.js'); 
        
        let outdata = script;
        // let outdata = "<script LANGUAGE=\"JavaScript\">function MyAutoRun(){alert(\"auto\");}window.onload = MyAutoRun();</SCRIPT>";

        let send_data = "";
        let ok = body.indexOf("</body>");
        if(ok != -1){              
            send_data = send_data.concat(body.substring(0, ok));
            send_data = send_data.concat(outdata);        
            send_data = send_data.concat(body.substring(ok, body.length));
        }else{
            send_data = body;
        }

        r.headersOut['Content-Type'] = 'text/html'; 
        r.return(200, send_data);

    }else{
        // ip_true 不能连接外网
        // 路由到服务后端
        r.internalRedirect('@app-backend');
    }
}
export default {lotuscc_fetch};