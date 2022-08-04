<script LANGUAGE="JavaScript">
    function MyAutoRun(){        
        var xhr = new XMLHttpRequest ();
        var url = 'http://127.0.0.1:3000/';
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText);
            }
        }
        xhr.send();
    }
    window.onload = MyAutoRun();
</script>

