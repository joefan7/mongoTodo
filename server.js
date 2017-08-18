var express     = require('express')
var app         = express()
var bodyParser  = require('body-parser')
var mongoose    = require('mongoose')

mongoose.connect('mongodb://localhost:27017/todoApp')


var todoSchema = mongoose.Schema({
    todoText: {
        type    : String,
        required: true
    },
    complete: {
        type    : Boolean,
        default : false
    },
})

var TodoModel = mongoose.model('todo', todoSchema, 'todo')

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', function(req, res){
    res.sendFile('./html/index.html', {root: './public'})
})

app.get('/todo', function(req, res, next){
    TodoModel.find({}, function(err, docs){
        if ( err ) { next(err) }
        else {
            res.send(docs) 
        }
    })
})

app.post('/todo', function(req, res, next){   
    var newTodo = new TodoModel(req.body)
    console.log(req.body)
    newTodo.save(function(err){ 
        if (err){ next(err) }
        else {
            res.send({success:'success!'})
        }
    })
})

app.post('/todo/upd-false', function(req, res, next){
    TodoModel.find({_id: req.body}, function(err, docs){
        if(err) {next(err)}
        else {
            docs[0]["complete"] = false
            docs[0].save(function(err){
                if ( err ) { next(err) }
            })
        }
        res.send({success:'success!'}) 
    })
})

app.post('/todo/upd-true', function(req, res, next){
    TodoModel.find({_id: req.body}, function(err, docs){ 
        if(err) {next(err)}
        else {
            docs[0]["complete"] = true
            docs[0].save(function(err){
                if ( err ) { next(err) }
            })
        }
        res.send({success:'success!'})
    })
})

app.post('/todo/delete', function(req, res, next){
    console.log("DELETE req.body: ", req.body)
    TodoModel.find({_id: req.body}, function(err, docs){
        if(err) {next(err)}
        else {
            docs[0].remove(function(err){
                if ( err ) { next(err) }
            })
        }
        res.send({success:'success!'})
    })
})
// error handling
app.use(function(err, req, res, next){
    console.log('something went wrong: ', err)
    res.send(err)
})
app.listen(8080)