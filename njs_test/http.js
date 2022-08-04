
// http.js
function foo(r) {
    r.log("hello from foo() handler");
    return "foo";
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

function hello(r) {
    r.return(200, "Hello world!");
}

// since 0.7.0
async function fetch(r) {
    // let results = await Promise.all([ngx.fetch('https://nginx.org/'),
    //                                  ngx.fetch('https://nginx.org/en/')]);

    let results = await Promise.all([ngx.fetch('http://180.101.49.12/'),
    ngx.fetch('http://180.101.49.12/')]);

    r.return(200, JSON.stringify(results, undefined, 4));
}


// since 0.7.0
async function lotuscc_fetch(r) {  
    var fetch_option = {
        method: 'GET',

        headers: {
            // 'Connection': 'keep-alive',
            // 'Access-Control-Allow-Credentials': 'true',
            // 'Access-Control-Allow-Origin': '*',
            // 'Location' : 'http://nginx.org'
        }
    };

    // let reply = await ngx.fetch('http://nginx.org/');
    // let reply = await ngx.fetch('http://127.0.0.1:8000/summary', fetch_option);    

    // let reply = await ngx.fetch('http://www.baidu.com/', fetch_option);
    // let reply = await ngx.fetch('http://3.125.197.172/', fetch_option);
    let reply = await ngx.fetch('http://180.101.49.12/', fetch_option);
    let body = await reply.text();
    
    r.return(200, body);
}

function lotuscc_subrequest(r) {
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


// since 0.7.0
async function hash(r) {
    let hash = await crypto.subtle.digest('SHA-512', r.headersIn.host);
    r.setReturnValue(Buffer.from(hash).toString('hex'));
}

export default {foo, summary, baz, hello, fetch, hash, lotuscc_fetch, lotuscc_subrequest};