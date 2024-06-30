const express = require('express')
const router = express.Router();

const menu = require('./../models/menu');

router.post('/', async (req, res) =>{
  try{
      const data = req.body;
      const newMenu = menu(data);
      
      const savedMenu = await newMenu.save();
      console.log("saved menu");
      res.status(200).json(savedMenu);

  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'internal error'});
  }
});


router.get('/', async (req, res) =>{

  try{
    const data = await menu.find();
    console.log("menu fetched");
    res.status(200).json(data);

  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'internal error'});
  }

});

router.get('/:taste', async(req, res) => {

  try{
    const taste = req.params.taste;
    if(taste == 'sweet' || taste == 'spicy' || taste == 'sour' || taste == 'salty'){
     const data = await menu.find({taste: taste});
     console.log("menu fetched");
     res.status(200).json(data);
    
    }else{
      console.log("Invalid menu items");
    }
  }catch(err){
    console.error("invalid error");
    res.status(404).json({error: 'invalid error'});
  }
  
})

router.put('/:id',async(req, res) => {
  try{
  const id = req.params.id;
  const updatedData = req.body;
  const updatedMenu = await menu.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true
  });
  if(!updatedMenu) {
    console.log("Invalid item");
    res.status(404).json({message: "Invalid item"});
  }
  console.log("Item Updated");
  res.status(200).json({updatedMenu});
}catch(e) {
  console.log("invalid Error");
  res.status(500).json({message: e.message});
}
})

router.delete('/:id', async (req, res) =>{
  try{
    const id = req.params.id;
    const deletedItem = await menu.findByIdAndDelete(id);
    if(!deletedItem){
      console.log("item not found");
      res.status(404).json({message: "Iten Not Found"});
    }
    console.log("deleted item");
    res.status(200).json({deletedItem});
  }catch(e) {
    console.log("invalid Error");
    res.status(500).json({message: e.message});
  }
});

module.exports = router;