
function dealwith(r) {
    let reply = await ngx.fetch('http://nginx.org/');
    let body = await reply.text();


    // let reply =  ngx.fetch('http://nginx.org/');
    // let body =  reply.text();
    
    r.return(200, body);

    // r.return(200, "hello, world");
}


export default {dealwith};