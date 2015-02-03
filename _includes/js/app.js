document.addEventListener("DOMContentLoaded", function () {

    // highlight.js
    hljs.initHighlightingOnLoad();

    // footer philosophy
    var XHR = XMLHttpRequest || ActiveXObject;
    var request = new XHR('MSXML2.XMLHTTP.3.0');
    request.open('GET', 'https://api.github.com/zen', true);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                document.querySelector('.zen').innerHTML = request.responseText;
            }
        }
    };
    request.send();

    // google analytics
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-35945795-1', 'danreev.es');
    ga('send', 'pageview');

});
