# Authentiation

`passport.js`, `passport-local`, (`passport-local-mongoose`), and `express-session`.

How we can keep logged-in state even though HTTP is "stateless": ***sessions!***

## Setup steps

```bash
npm init
touch index.js
npm install express mongoose --save
npm install passport passport-local --save
npm install passport-local-mongoose --save
npm install body-parser express-session --save
npm install ejs --save
mkdir views
mkdir models
touch views/home.ejs
touch views/secret.ejs
touch views/register.ejs
touch views/login.ejs
touch models/user.js
```

Create the files as seen in this folder, then run

```bash
node index.js
```
