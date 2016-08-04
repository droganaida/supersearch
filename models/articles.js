var mongoose = require('../libs/mongoose');

    Schema = mongoose.Schema;

var schema = new Schema({

    title: {
        type: String,
        required: true
    }
});

schema.index(
    {title: 'text'}, { default_language: "russian" }
);

schema.index(
    {title: 1}, {unique: true, dropDups: true}
);

exports.Articles = mongoose.model('Articles', schema);

// Вставляем в консоль mongodb, чтобы заполнить базу
// use supersearch
// db.articles.insert([{title: "Кошки не едят горошек"}, {title: "Кошка лучший друг человека"}, {title: "Блондинка тоже человек"}, {title: "Блондинка в платье в горошек"}, {title: "Кошки любят программирование"}, {title: "Программирование под силу не только кошкам, но и блондинкам"}, {title: "Железный человек съел свою кошку"}])