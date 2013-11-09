var search = {
    init: function () {
        var initDone = false;
        if (initDone === false) {
            $('search').off();
            $('#search').on('focus', function () {
                search.load();
            });
            $('#search').on('keyup', function () {
                search.search(search.json);
            });
            initDone = true;
        }
    },
    json: [],
    load: function () {
        $.ajax({
            url: '/search.json',
            dataType: 'json',
            success: function (data) {
                search.json = data;
            },
            error: function (a,b,c) {

            }
        });
        $('#search').off('focus');
    },
    search: function () {
        var input = $('#search').val().trim().toLowerCase().split(' '),
            results = [];
        $.each(search.json, function (key, post) {
            if (post) {
                var title = ''+post.title,
                    date  = ''+post.date,
                    score = 0;
                $.each(input, function (k, inpt) {
                    if (inpt !== '') {
                        var re = new RegExp(inpt, 'g');
                        if (title.toLowerCase().match(re)) {
                            score += (title.toLowerCase().match(re) || []).length;
                        }
                        if (date.toLowerCase().match(re)) {
                            score += (date.toLowerCase().match(re) || []).length;
                        }
                        $.each(post.tags, function (k, tag) {
                            if (tag !== false) {
                                if (tag.toString().toLowerCase().match(re)) {
                                    score += (tag.toString().toLowerCase().match(re) || []).length;
                                }
                            }
                        });
                    }
                });
                if (score > 0) {
                results.push({
                    title: title,
                    url: post.url,
                    score: score
                });
                }
            }
        });
        results.sort(function(a,b) { return parseFloat(b.score) - parseFloat(a.score); } );
        console.log(results);
    }
};
$(document).ready(search.init);
