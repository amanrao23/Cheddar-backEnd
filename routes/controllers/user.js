  const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Conversation=require('../../models/Conversation')

exports.registerUser = async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        email,
        username,
        password
      });
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }


  exports.getConversations = async (req,res)=>{
      
    try {
   let conversations= await Conversation.find({ recipients: { $elemMatch: { $eq: req.user.id} } })
   res.status(200).send(conversations);
    } 
    catch (error) {
      console.error(err.message);
      res.status(500).send('Server error');
    }

  }


  exports.newConversation = async (req,res)=>{
      
    const { username } = req.body;
    try {
   let otherUser=  await User.findOne({username:username }).select("-password")

   if(!otherUser){
    res.status(404).send('This user does not exist')
   }

   let oldConvo= await Conversation.find({ recipients: [req.user.id,otherUser.id] })
   console.log(oldConvo)
   if(oldConvo){
       res.status(200).send(oldConvo)
   }
   else{
    let newConvo= new Conversation({recipients:[req.user.id,otherUser.id]})
    await newConvo.save();
    console.log(newConvo)
   res.status(200).send(newConvo);
   }
   
    } catch (error) {
        
      console.error(err.message);
      res.status(500).send('Server error');
    }

  }