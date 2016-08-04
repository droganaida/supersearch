var log = require('../libs/log')(module);
var Myconfig = require('../libs/myconfig');
var Arcticles = require('../models/articles').Articles;

exports.get = function(req, res){

    res.locals.title = "BlondieCode. Лайфхаки программиста. Поиск с подстановкой.";
    res.locals.htmldescription = "BlondieCode. Блог блондинки-программиста. Подписывайся. Здесь много интересного.";
    res.locals.htmlkeywords = "BlondieCode, программирование";

    res.render('./main/main');

};

exports.post = function (req, res) {

    if (req.body.action == 'search'){

//===============================Три вида поиска, выбери свой! Закомментируй остальные ;)======================================//

//===================================REGEX SEARCH===================================//
//
//        var searchRequestStart = '^' + req.body.request + '.*';
//        var searchRequestMiddle = ' ' + req.body.request + '.*';
//        var params = {};
//
//        var searchCondition = [{title: {$regex: searchRequestStart, $options: 'im'}}, {title: {$regex: searchRequestMiddle, $options: 'im'}}];
//
//        if (req.body.request.indexOf(' ') != -1){
//
//            var strArray = req.body.request.split(' ');
//            var moreConditions = [];
//            var andCondition = {};
//
//            for (var i=0; i<strArray.length; i++){
//
//                if (strArray[i].length > 0){
//
//                    var searchRequestStartTemp = ' ' + strArray[i] + '.*';
//                    var searchRequestMiddleTemp = '^' + strArray[i] + '.*';
//                    var titleCondition = {};
//
//                    titleCondition.$or = [{title: {$regex: searchRequestStartTemp, $options: 'im'}}, {title: {$regex: searchRequestMiddleTemp, $options: 'im'}}];
//                    moreConditions.push(titleCondition);
//                }
//
//            }
//
//            andCondition.$and = moreConditions;
////          andCondition.$or = moreConditions;
//            searchCondition.push(andCondition);
//
//        }
//
//
//        params.$or = searchCondition;
//===================================END REGEX SEARCH===================================//


//===================================TEXT OR SEARCH===================================//
//        var params = {};
//        //var textKey = '\"' + req.body.request + '\"';
//        var textKey = req.body.request;
//        params.$text = {$search: textKey};
//===================================END TEXT OR SEARCH===================================//


//===================================TEXT AND SEARCH===================================//
        var params = {};
        var textArray = req.body.request.split(' ');
        var textKey = '';
        for (var i=0; i<textArray.length; i++){
            if (i == 0){
                textKey = '\"' + textArray[i] + '\"';
            } else {
                textKey = textKey + ' ' + '\"' + textArray[i] + '\"';
            }
        }
        params.$text = {$search: textKey};
//===================================END END TEXT OR SEARCH===================================//


        Arcticles.find(params, function(err, articles){
            res.send({result: articles});
        });
    }

};
