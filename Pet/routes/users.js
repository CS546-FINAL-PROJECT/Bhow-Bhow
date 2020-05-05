const express = require("express");
const router = express.Router();
const data = require("../data");

router.post('/user', async (req, res) => {
    let userInfo = req.body;
    if(!userInfo){ throw "Must include user info";}  

    
    if(!userInfo.user_name){
        res.status(400).json({error: 'You must have a username' });
    }
    if(!userInfo.user_password){
      res.status(400).json({error: 'You must have a password' });
  }
    if(!userInfo.user_email){
    res.status(400).json({error: 'You must have a valid email' });
    }
    if(!userInfo.user_gender){
    res.status(400).json({error: 'You must have a gender' });
}
    if(!userInfo.user_city){
    res.status(400).json({error: 'You must have a city' });
  }
  if(!userInfo.user_state){
    res.status(400).json({error: 'You must have a state' });
  }
  if(!userInfo.user_age){
    res.status(400).json({error: 'You must have an age' });
  }
  if(!userInfo.favorite_list){
    res.status(400).json({error: 'You must have an favorite list' });
  }
    try{
      const{user_name, user_password, user_email, user_gender, user_city, user_state, user_age, favorite_list} = userInfo;
      const newUser = await userData.addUser(user_name, user_password, user_email, user_gender, user_city, user_state, user_age, []);
      res.json(newUser);
    }
    catch(e) {
      res.status(500).json({error: e});
    }
  });

  router.get("/users/{id}", async(req, res) => {
    
    try{
      const user = await userData.getUser(req.params.id);
      res.json(user);
    }
    catch(e){
      res.status(500).json({error: e});
    }

  })

  router.put("/user/{id}", async(req,res) => {
    let updatedUser = req.body;
    try{
      await userData.getUser(req.params.id);
    } catch (e) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
  
    try {
      const updatedUser = await userData.updateUser(req.params.id, updatedUser);
      res.json(updatedUser);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });

  router.delete("/user/{id}", async(req,res) => {
    if (!req.params.id) {
      res.status(400).json({ error: 'You must supply an ID to delete' });
      return;
    }
    try {
      await userData.getUser(req.params.id);
    } catch (e) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    try {
      await userData.removeUser(req.params.id);
      res.sendStatus(200);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });
