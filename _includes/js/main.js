// window.fitText( document.getElementById('h1'), 2, {maxFontSize: 48, minFontSize: 32} );
// hljs.initHighlightingOnLoad();
$('#search').typeahead({
    prefetch: '/search.json',
    template: [
        '<p class="repo-language">{{name}}</p>',
        '<p class="repo-name">{{date}}</p>'
        ].join(''),
    engine: Hogan
});
// (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
// function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
// e=o.createElement(i);r=o.getElementsByTagName(i)[0];
// e.src='//www.google-analytics.com/analytics.js';
// r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
// ga('create','UA-35945795-1');ga('send','pageview');
