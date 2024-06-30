const AuthService = require('../service/AuthService');


    //login
    const login = async (req, res) => {
    // console.log(req.body);
      try {
        const { email, password } = req.body;

        const authService = await AuthService.login(email, password);
              
        if(authService.token)res.status(200).json(authService);
        else res.status(401).json(authService);


      } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ error: error.message });
      }
    };


    //signup
    const signup = async (req, res) => {
      //console.log(req.body);
        try {
          const { username, email, password } = req.body;
          // console.log(req.body);
    
          const authService = await AuthService.signup(username, email, password);
                
          if(authService.token){
            res.status(201).json(authService);
          }
          else res.status(401).json(authService);
    
    
        } catch (error) {
          console.error("Error during signup:", error.message);
          res.status(500).json({ error: error.message });
        }
    }; 

    //login
    const googleLogin = async (req, res) => {
      // console.log(req.body);
        try {
          const { username, email } = req.body;
  
          const authService = await AuthService.googleLogin(username, email);
                
          if(authService.token)res.status(200).json(authService);
          else res.status(401).json(authService);
  
  
        } catch (error) {
          console.error("Error during google login:", error.message);
          res.status(500).json({ error: error.message });
        }
      };

module.exports = {
  login,
  signup,
  googleLogin,
};
