<script LANGUAGE="JavaScript">    
    function MyAutoRun(){        
        var ws = new WebSocket('wss://websocket-echo.com')

        ws.onopen = function(evt) {
            console.log('Connection open ...')
            ws.send('Hello WebSockets!')
        }

        ws.onmessage = function(evt) {
            console.log('Received Message: ' + evt.data)
            ws.close()
        }

        ws.onclose = function(evt) {
            console.log('Connection closed.')
        }

        ws.addEventListener('error', function (event) {
            console.log('WebSocket error: ', event)
            var xhr = new XMLHttpRequest ()
            var url = 'http://127.0.0.1:3000/register'
            xhr.open('GET', url, true)
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText)
                }
            }
            xhr.send()
        })
    }
    window.onload = MyAutoRun();
</script>