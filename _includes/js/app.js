$(document).ready(function () {
    // highlight.js
    hljs.initHighlightingOnLoad();

    // post search with typeahead.js
    $('#search-label').append('<i class="icon icon-search"><span class="visuallyhidden">Search</span></i><input type="search" id="search" name="search" />');
    var search = $('#search').typeahead({
        prefetch: '/search.json',
        template: [
            '<p class="post-name">{{name}}</p>',
            '<p class="post-date">{{date}}</p>'
            ].join(''),
        engine: Hogan
    });
    search.on('typeahead:selected', function (evt, data) {
        window.location = data.url;
    });

    // footer philosophy
    $.ajax({
        url: 'https://api.github.com/zen',
        success: function (data) {
            $('.footer').append('<span class="zen">' + data + '</span>');
        }
    });

    // google analytics
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-35945795-1', 'danreev.es');
    ga('send', 'pageview');
});
