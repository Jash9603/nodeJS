const express = require('express')
const router = express.Router();

const person = require('./../models/person');

router.post('/',async (req, res) =>{

  try {

    const data = req.body;
    const newPerson = person(data);
  
   const savedPerson = await newPerson.save();
   console.log("data saved");
   res.status(200).json(savedPerson);

  }catch(err){
  console.log(err);
  res.status(500).json({error: 'internal error'});
}
  
 
});

router.get('/', async (req, res) =>{

  try{
    const data = await person.find();
    console.log("data fetched");
    res.status(200).json(data);

  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'internal error'});
  }

});


router.get('/:work', async(req, res) => {

  try{
    const workType = req.params.work;
    if(workType == 'student' || workType == 'faculty' || workType == 'administrator'){
     const data = await person.find({work: workType});
     console.log("data fetched");
     res.status(200).json(data);

    }
  }catch(err){
    console.error("invalid workType");
    res.status(404).json({error: 'invalid work type'});
  }
  
})


router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedPersondata = req.body;

    console.log('Received ID:', id);
    console.log('Received Body:', updatedPersondata);

    const updatedPerson = await person.findByIdAndUpdate(id, updatedPersondata, {
      new: true,
      runValidators: true
    });

    if (!updatedPerson) {
      console.log("Invalid ID");
      return res.status(404).json({ message: 'Person not found' });
    }

    console.log('Person updated');
    res.status(200).json({ updatedPerson });
  } catch (err) {
    console.error("Internal error:", err);
    res.status(500).json({ error: 'Internal error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPerson = await person.findByIdAndDelete(id);
    
    if (!deletedPerson) {
      console.log('Invalid person', id);
      return res.status(404).json({ message: 'Invalid person' });
    }

    console.log("Person deleted");
    res.status(200).json({ deletedPerson });
  } catch (err) {
    console.error("Internal error:", err);
    res.status(500).json({ error: 'Internal error' });
  }
});



module.exports = router;