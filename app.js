var express = require('express');
var app = express();
var sql = require('mssql');
var config = {
    user: 'books',
    password: 'pluralsight1@',
    server: 'robisaacsbooks.database.windows.net',
    database: 'Books',
    
    options: {
        encrypt: true // used for windows azure
    }
};

sql.connect(config, function(err) {
    console.log(err);
});

var port = process.env.PORT || 5000;
var nav = [{

                Link: '/Books', 
                Text: 'Book'
            },{
                Link: '/Authors', 
                Text: 'Author'
            }];

var bookRouter = require('./src/routes/bookRoutes')(nav);

app.use(express.static('public'));
app.set('views','./src/views');

app.set('view engine', 'ejs');

app.use('/Books', bookRouter);

app.get('/', function (req, res){
    res.render('index', {
        title: 'Hello from render', 
        nav: [{
                
            Link: '/Books', 
            Text: 'Books'
        },{
            Link: '/Authors', 
            Text: 'Authors'}]
    });
});

app.get('/books', function(req,res){
    res.send('hello books');
});

app.listen(port,function(err){
    console.log('running server on port ' + port);
});