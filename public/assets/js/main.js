const mongoose = require('mongoose')
const myShows = require('../../../models/myShows')

function showAdd(){
    document.getElementById("add").style.display="flex";
    document.getElementById("remove").style.display="none";
}
function showRemove(){
    document.getElementById("remove").style.display="flex";
    document.getElementById("add").style.display="none";
}
function checkFav(id){
    app.get('/update/:id', (req, res) => {
        // Quering:Native MongoDb
        console.log(req.params.id)
    
        //  Quering:mongoose
        myShows.findById(req.params.id)
            .then(result => res.redirect(`/details/${req.params.id}`, { result: result }))
            .catch(err => console.log(err))
    })
    if(myShows.findById({_id:id}).count()=1){

        console.log('die zu findene id ist :',id);
      

        showRemove()
    }
    else{
        showAdd()
    }
}