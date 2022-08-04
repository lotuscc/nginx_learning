
// since 0.7.0
async function lotuscc_fetch(r) {  
    let fetch_option = {
        method: 'GET',

        headers: {
            'Accept-Encoding' : '',
        }
    };

    let reply = await ngx.fetch('http://127.0.0.1:8080/index.html', fetch_option);
    let body = await reply.text();
    
    let fs = require('fs')
    let script = fs.readFileSync('/home/lotuscc/git_test/newborn_learning/2022-07-11/auto.js'); 
    
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
}

export default {lotuscc_fetch};