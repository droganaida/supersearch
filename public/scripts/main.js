//================================= Поиск с подстановкой ====================================//
//=================================== Aida Drogan © 2016 ====================================//
//=========================== #BlondieCode - уроки программирования =========================//

(function ( $ ) {

    $.fn.autoSearch = function() {

        var request = '';
        var input = this;

        input.wrap('<div class="searchHolder"></div>');
        input.parent().append('<div class="autoFillBar"></div>');
        var autoFillBar = input.next();

        input.on('focus', function(){

            searchCheck();

        });

        input.on('keyup', function(e){
            if (e.keyCode == 40){

                if (autoFillBar.find('.active').length == 0){
                    autoFillBar.find('.item:first').addClass('active');
                } else {
                    autoFillBar.find('.active').removeClass('active').next().addClass('active');
                }

                var val = autoFillBar.find('.active').text();
                input.val(val);

            } else if (e.keyCode == 38) {

                if (autoFillBar.find('.active').length == 0){
                    autoFillBar.find('.item:last').addClass('active');
                } else {
                    autoFillBar.find('.active').removeClass('active').prev().addClass('active');
                }

                var val = autoFillBar.find('.active').text();
                input.val(val);

            } else if (e.keyCode == 13) {

                //тут можно сделать переход на страницу статьи или все что пожелаешь

            } else {

                searchCheck();
            }

        });

        autoFillBar.on('click', '.item', function(){

            //тут можно сделать переход на страницу статьи или все что пожелаешь
            input.val( $(this).text() );
            return false;

        });

        $('html').on('click', function(e){

             if ((!$(e.target).hasClass('autoFillBar')) && (!$(e.target).parent().hasClass('autoFillBar')) && (!$(e.target).parent().hasClass('searchHolder'))) {

                 autoFillBar.slideUp('fast', function(){
                     autoFillBar.children().remove();
                 });
             }
        });


        function searchCheck(){

            if (input.val().length >= 2){

                var data = {};
                data.action = 'search';
                data.request = input.val();

                $.ajax({
                    url: '/',
                    type: 'POST',
                    dataType: 'json',
                    data: data
                }).done(function(data){

                        autoFillBar.children().remove();

                        var articlesArray = data.result;

                        for(var i=0; i <= articlesArray.length - 1; i++){

                            var name = articlesArray[i].title;
                            var regex = input.val();

                            if (regex.indexOf(' ') == -1){
                                var searchMask = regex;
                                var regEx = new RegExp(searchMask, "ig");

                                var num = name.toLowerCase().indexOf(regex.toLowerCase());
                                var strname = name.substr(num, regex.length);
                                var replaceMask = '<b class="highlighted">' + strname + '</b>';
                                name = name.replace(regEx, replaceMask);

                            } else {


                                var regexArr = regex.split(' ');

                                for(var n=0; n<regexArr.length; n++){

                                    if (regexArr[n].length > 0){
                                        var searchMask = regexArr[n];
                                        var regEx = new RegExp(searchMask, "ig");

                                        var num = name.toLowerCase().indexOf(regexArr[n].toLowerCase());
                                        var strname = name.substr(num, regexArr[n].length);
                                        var replaceMask = '<b class="highlighted">' + strname + '</b>';
                                        var stopWords = '<b class="highlighted"></b>';
                                        if (stopWords.indexOf(strname.toLowerCase()) == -1){
                                            name = name.replace(regEx, replaceMask);
                                        }
                                    }
                                }
                            }

                            autoFillBar.append('<div class="item">' +
                                '<span>' + name + '</span>' +
                                '</div>');
                        }

                        autoFillBar.slideDown('fast');
                })
            }
        }

        return input;
    };

    $(document).ready(function(){

        $('#superSearch').autoSearch();

    });

}( jQuery ));

