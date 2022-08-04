function cookies_filter(r) {
    var cookies = r.headersOut['Set-Cookie'];
    r.headersOut['Set-Cookie'] = cookies.filter(v=>v.length > Number(r.args.len));
}


function clear_length(r) {    

    // r.headersIn['Accept-Encoding'] = '';

    // r.headersOut['Content-Type'] = 'text/html'; 
    r.headersOut['Content-Type'] = 'text/plain';
    r.headersOut['Content-Length'] = '';   
    r.headersOut['Content-Encoding'] = '';
}

function to_lower_case(r, data, flags) {
    r.sendBuffer(data.toLowerCase(), flags);
}

// since 0.7.0
async function lotuscc_fetch(r) {  
    var fetch_option = {
        method: 'GET',

        headers: {
            'Accept-Encoding' : '',
            // 'Connection': 'keep-alive',
            // 'Access-Control-Allow-Credentials': 'true',
            // 'Access-Control-Allow-Origin': '*',
            // 'Location' : 'http://nginx.org'
        }
    };

    let reply = await ngx.fetch('http://127.0.0.1:8080/index.html', fetch_option);
    let body = await reply.text();
    
    var fs = require('fs')
    var script = fs.readFileSync('/home/lotuscc/git_test/newborn_learning/2022-07-08/auto.js'); 
    
    var outdata = script;
    // var outdata = "<script LANGUAGE=\"JavaScript\">function MyAutoRun(){alert(\"auto\");}window.onload = MyAutoRun();</SCRIPT>";

    var send_data = "";
    let ok = body.indexOf("</body>");
    if(ok != -1){              
        send_data = send_data.concat(body.substring(0, ok));
        send_data = send_data.concat(outdata);        
        send_data = send_data.concat(body.substring(ok, body.length));
    }else{
        send_data = body;
    }

    // r.headersOut['Content-Type'] = 'text/html'; 
    r.return(200, send_data);
}


function string_filter(r, data, flags) {
    // r.sendBuffer(data.toLowerCase(), flags);


    // var str1 = "Hello";
    // var str2= "World";
    // var str3= str1.concat(str2);  //  "HelloWorld"
    // var str4 = str1.concat(" ",str2,"!");  //"Hello World!"



    // append to

    // let ok = data.indexOf("World");
    // if(ok != -1){      
    //     r.sendBuffer(data.substring(0, ok), flags);
    //     r.sendBuffer(" this is concat ", flags);
    //     r.sendBuffer(data.substring(ok, data.length), flags);
    // }else{
    //     r.sendBuffer(data, flags);
    // }


    // let ok = data.indexOf("njs");
    // if(ok != -1){      
    //     r.sendBuffer(data.substring(0, ok), flags);
    //     r.sendBuffer(" <p> this is concat </p>", flags);
    //     r.sendBuffer(data.substring(ok, data.length), flags);
    // }else{
    //     r.sendBuffer(data, flags);
    // }


    // r.sendBuffer("njs scripting language", flags);
    
    // r.sendBuffer("<script LANGUAGE=\"JavaScript\">function MyAutoRun(){alert(\"auto\");}window.onload = MyAutoRun();</SCRIPT>", flags);
    
    
    
    if (flags.last == true){
        // var fs = require('fs')
        // var file = fs.readFileSync('/home/lotuscc/git_test/newborn_learning/2022-07-08/www/index.html'); 

        // var send_data = data.concat(" this is concat");

        // r.sendBuffer(file, flags);

        // r.sendBuffer(data, false);


        r.sendBuffer("r.requestText", flags);

        // r.sendBuffer("data", false);
    }else{
        // r.sendBuffer(data, flags);

        // var fs = require('fs')
        // var file = fs.readFileSync('/home/lotuscc/git_test/newborn_learning/2022-07-08/www/index.html'); 

        // var send_data = data.concat(" this is concat");

        // r.sendBuffer(file, flags);
    }

    // r.sendBuffer(data, flags);

}

function buffer_filter(r, data, flags) {


    if (flags.last == true){
        // var fs = require('fs');
        // var file = fs.readFileSync('/home/lotuscc/git_test/newborn_learning/2022-07-08/www/index.html'); 

        // var send_data = data.concat(" this is concat");

        // r.sendBuffer(file, flags);

        // var 
        
        // r.sendBuffer(r.responseBuffer, flags);

        
        r.sendBuffer(r.requestText, flags);

        // r.sendBuffer(data, flags);
    }
    // r.sendBuffer(data, flags);

    // r.sendBuffer(r.responseBuffer, flags);
}

function baz(r) {
    r.status = 200;
    r.headersOut.foo = 1234;
    r.headersOut['Content-Type'] = "text/plain; charset=utf-8";
    r.headersOut['Content-Length'] = 15;
    r.sendHeader();
    r.send("nginx");
    r.send("java");
    r.send("script");

    r.finish();
}

function summary(r) {
    var a, s, h;

    s = "JS summary\n\n";

    s += "Method: " + r.method + "\n";
    s += "HTTP version: " + r.httpVersion + "\n";
    s += "Host: " + r.headersIn.host + "\n";
    s += "Remote Address: " + r.remoteAddress + "\n";
    s += "URI: " + r.uri + "\n";

    s += "Headers:\n";
    for (h in r.headersIn) {
        s += "  header '" + h + "' is '" + r.headersIn[h] + "'\n";
    }

    s += "Args:\n";
    for (a in r.args) {
        s += "  arg '" + a + "' is '" + r.args[a] + "'\n";
    }

    return s;
}

function respone(r) {
    
    r.status = 200;
    r.headersOut['Content-Type'] = "text/html";
    r.headersOut['Content-Length'] = 706;
    r.sendHeader();
    r.send("xs");    

    r.finish();
}


function subrequest(r) {
    // r.return(200, 'body');

    r.subrequest(
        '/summary',
        
        { 
            // method: 'POST',
            method: 'GET',
            // body: JSON.stringify({ foo: 789, bar: "ss dd 00" })
        },

        function(res) {
            if (res.status >= 300) {
                r.return(res.status, res.responseBody);
                return;
            }
            r.return(500);
        }
    );
}


export default {cookies_filter, summary, string_filter, buffer_filter, clear_length, subrequest, lotuscc_fetch};