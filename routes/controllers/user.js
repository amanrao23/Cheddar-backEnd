const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Conversation=require('../../models/Conversation')

exports.registerUser = async (req, res) => {
    const { name, username, email, password } = req.body;
    console.log(req.body)
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
console.log(user)
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
   let conversations= Conversation.find({ recipients: { $elemMatch: { $eq: req.user.id} } })
   console.log(conversations)
   res.json(conversations)
    } catch (error) {
        
      console.error(err.message);
      res.status(500).send('Server error');
    }

  }


  exports.newConversation = async (req,res)=>{
      
    const { username } = req.body;
    try {
   let otherUser= Conversation.findOne({username:username })
   console.log(otherUser)

   if(!otherUser){
    res.status(404).send('This user does not exist')
   }

   let newConvo= new Conversation({recipients:[req.user.id,otherUser.id]})
   console.log(newConvo)

   res.json(conversations)
    } catch (error) {
        
      console.error(err.message);
      res.status(500).send('Server error');
    }

  }