$(document).ready(function(){

    var render = function(){
        $('#todoList').empty()
        for (var i = 0; i < todoList.length; i++ ) {
            if (todoList[i].complete === false) {
                $('#todoList').append(`<li id="${todoList[i]._id}" class="task">${todoList[i]['todoText']}</li><button btn-task-number="${todoList[i]._id}" class="taskButton">Delete</button> <hr>`)
            } else {
                $('#todoList').append(`<li id="${todoList[i]._id}" class="task lineThrough">${todoList[i]['todoText']}</li><button btn-task-number="${todoList[i]._id}" class="taskButton">Delete</button> <hr>`)
            }
        }
    }

    var delayMillis = 500;
    
    var getFreshData = function(){
        $.get('/todo', function(data){
            console.log(data)
            todoList = data
            render()
        })
    }

    var todoList = []
    getFreshData()

    $('body').on('click', '.taskButton', function(event){
        event.preventDefault()
        var btnTaskNumber = $(event.target).attr('btn-task-number')
        var btnItem = document.getElementById(btnTaskNumber)
        console.log("Button Clicked", btnTaskNumber, btnItem)
        $.post('/todo/delete', $(this).serialize() + '_id=' + btnTaskNumber, function(data){
            getFreshData()
        })
    })

    $('body').on('click', '.task', function(event){
        event.preventDefault()
        var dataTaskNumber = $(event.target).attr('id')
        var listItem = document.getElementById(dataTaskNumber)
        if (listItem.className.includes('lineThrough')){
            $.post('/todo/upd-false', $(this).serialize() + '_id=' + dataTaskNumber, function(data){
                getFreshData()
            })
        } else {
            $.post('/todo/upd-true', $(this).serialize() + '_id=' + dataTaskNumber, function(data){
                getFreshData()
            })
        }
    })

    $('#newTodoForm').on('submit', function(event){
        event.preventDefault()
        console.log('#newTodoForm this',$( this ).serialize())
        $.post('/todo', $(this).serialize(), function(data){
            console.log('#newTodoForm data ',data)
            getFreshData()
        })
    })
})