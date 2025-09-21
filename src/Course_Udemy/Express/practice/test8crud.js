const express = require('express')
const app = express()
let { people } = require('./data')

app.use(express.static('./methods-public'))
// parse form data
app.use(express.urlencoded({ extended: false }))

app.use(express.json());
app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people })
})

app.put('/api/people/:id', (req,res)=>  {
const { id } = req.params; //params , not id
const {name} = req.body;

const person = people.find((x)=> x.id === Number(id));
if(!person){
    return res.status(404)
    .json({success:false, msg: `no person with id ${id}`}) //backtick `
}

const newPeople = people.map((person)=>{
    if(person.id ===  Number(id)){
person.name = name;


    }return person
})
res.status(200).json({success:true, data: newPeople})
})

app.delete('/api/people/:id', (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id))
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` })
  }
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  )
  return res.status(200).json({ success: true, data: newPeople })
})


app.post('/api/people', (req, res)=> {

   const{name} = req.body;
   if(!name){
    return res
    .status(400)
    .json({success:false, msg: 'please provide name value'})

   }
   res.status(201).json({success:true, person: name})
})

app.post('/api/postman/people', (req, res)=>{

    const {name} = req.body

    if(!name){
        return res.status(400).json({success:false, msg: 'please provide name'})
    }
    return res.status(201).json({success:true, data: [...people, name]})
});

  app.post('/login', (req, res) => {
       const { name } = req.body;

       if (name) {
           return res.status(200).json({success:true, msg:`Welcome ${name}`});
       } else {
return res.status(401).json({ success: false, msg: 'Please provide credentials' });
       }
   });




app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
