const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const { v4: uuidv4 } = require("uuid");
const PORT = process.env.PORT || 4000;
const post = require('./post');
const users = require('./users');
const categories = require('./categories');
const sessions = require('./sessions');
const userAbout = require('./userAbout');
const validateUserName = require('./validations');

app.use(express.urlencoded({ extended: false }));
app.use(express.static("./build"));
app.use(express.json());
app.use(cookieParser());

// Register new user into the application
app.post('/api/v1/register', express.json(), (req, res) => {
    const existingUser = users.getUserData(req.body.username);
    const [isValid, errorMessage] = validateUserName(req.body.username);
    if (existingUser) {
        res.status(400).json(`User with username - ${req.body.username} already exits`);
    } else if (!isValid) {
        res.status(400).json(errorMessage);
    } 
    else if (!req.body.username || !req.body.email || !req.body.about) {
        res.status(400).json('Please fill out all the fields mentioned above.');
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
        res.status(400).json('Invalid Email ID, Please Enter a valid email address');
    }
    else {
        const username = req.body.username;
        const email = req.body.email;
        const about = req.body.about;
        const date = new Date();
        const createDate = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        const updateDate = createDate;
        users.setUserData(username, email, createDate, updateDate);
        userAbout.setUserAboutData(username,about);
        res.status(200).json('New User Added, Please Login to continue');
    }
});

// Get current user
app.get("/api/v1/getCurrentUser", express.json(), (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions.getUserSession(sid);
    if (!sid || !username) {
        res.json({ error: "No user loggedin" });
        return;
    }
    const email = users.getUserData(username).email;
    res.json({ username, email });
})

// Login existing user 
app.post('/api/v1/login', express.json(), (req, res) => {
    const username = req.body.username;
    const existingUser = users.getUserData(username);
    const [isValid, errorMessage] = validateUserName(username);

    if (!isValid){
        res.status(400).json(errorMessage);
    }else if (!existingUser) {
        res.status(400).json(`User with username - ${username} does not exist, Please register user to continue`);
    } else {
        const token = uuidv4();
        sessions.setUserSession(token, username);
        console.log('sessions in login : '+sessions);
        res.cookie("sid", token);
        res.cookie("username", username);
        res.status(200).json('Login successful');
    }
});

//Logout user
app.post("/api/v1/logout", express.json(), (req, res) => {
    const token = req.cookies.sid;
    delete sessions[token];
    res.clearCookie('name');
    res.clearCookie('sid');
    res.json('Logout successful')
});

// Update existing userdata
app.put('/api/v1/:username', express.json(), (req, res) => {
    if (req.body.username === req.params.username) {
        const user = users.getUserData(req.body.username);
        if (!user) {
            res.status(400).json('User does not exist');
        } else {
            const email = req.body.email;
            if (!email) {
                res.status(400).json('No data entered to update')
            } else {
                const createDate = user.createDate;
                const date = new Date();
                const updateDate = date.toLocaleDateString() + " " + date.toLocaleTimeString();
                users.setUserData(req.body.username, email, createDate, updateDate);
                res.status(200).json('User data has been updated')
            }
        }
    } else {
        res.status(400).json('You can only update your account');
    }
});

// Delete existing user
app.delete('/api/v1/:username', express.json(), (req, res) => {
    if (req.body.username === req.params.username) {
        const user = users.getUserData(req.body.username);
        if (!user) {
            res.status(400).json('User does not exist');
        } else {
            users.deleteUserDate(req.body.username);
            res.status(200).json('User has been deleted');
        }
    } else {
        res.status(400).json('You can only delete your account');
    }
});

// Get particular user
app.get('/api/v1/getUser/:username', express.json(), (req, res) => {
    if (!req.params.username) {
        res.status(400).json('No username inserted');
    } else {
        const user = users.getUserData(req.params.username);
        if (!user) {
            res.status(400).json('User does not exist');
        } else {
            res.status(200).json(user);
        }
    }
});

// Get all users
app.get('/api/v1/getUsers', express.json(), (req, res) => {
    const userInfo = users.getUsers();
    res.status(200).json(userAbout.getUserAbout());
});

// Create Post
app.post('/api/v1/createPost', express.json(), (req, res) => {
    const username = req.cookies.username;
    const user = users.getUserData(username);
    const title = req.body.title;
    const desc = req.body.desc;
    const category = req.body.category;
    if (!user) {
        res.status(400).json('User not logged in');
    } else if (!title) {
        res.status(400).json('Title of the post cannot be blank');
    } else if (!desc) {
        res.status(400).json('Post Description cannot be blank');
    } else {
        const date = new Date();
        const createDate = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        const updateDate = createDate;
        post.addNewPost(username, title, desc, category, createDate, updateDate);
        res.status(200).json('New post has been added');
    }
});

// Update a post
app.put('/api/v1/updatePost/:id', express.json(), (req, res) => {
    const username = req.cookies.username;
    const id = req.params.id;
    const user = users.getUserData(username);
    const singlePost = post.getPostById(id);

    if (!user) {
        res.status(400).json('User not logged in');
    } else if (!id) {
        res.status(400).json('Post ID not specified');
    } else if (!singlePost) {
        res.status(400).json('Post not found');
    } else {
        const createDate = singlePost.createDate;
        const date = new Date();
        const updateDate = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        const title = req.body.title;
        const desc = req.body.desc;
        const category = req.body.category;
        post.updatePost(id, username, title, desc, category, createDate, updateDate);
        res.status(200).json('Post has been updated');
    }
});

// Delete a post
app.delete('/api/v1/deletePost/:id', express.json(), (req, res) => {
    const username = req.cookies.username;
    const id = req.params.id;
    const user = users.getUserData(username);
    const singlePost = post.getPostById(id);

    if (!user) {
        res.status(400).json('User not logged in');
    } else if (!id) {
        res.status(400).json('Post ID not specified');
    } else if (!singlePost) {
        res.status(400).json('Post not found');
    } else if (singlePost.username !== username) {
        res.status(400).json('User not authorized to delete post');
    }
    else {
        post.deletePost(id);
        res.status(200);
    }
});

// Get a Post
app.get('/api/v1/getPost/:id', express.json(), (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json('Id cannot be blank');
    } else {
        res.status(200).json(post.getPostById(id));
    }
});

// Get Posts for a user
app.get('/api/v1/getFilteredPosts/', express.json(), (req, res) => {
    // const username = req.cookies.sid;
    const username = 'Swapnil';
    if (!username) {
        res.status(400).json('User Not logged in, Please login to continue');
    } else {
        const user = req.query.user;
        const category = req.query.category;
        const allPosts = post.getPosts();
        const filteredPosts = [];
        if (user !== '' && user !== undefined) {
            Object.values(allPosts).forEach(singlePost => {
                if (user === singlePost.username) {
                    filteredPosts.push(singlePost);
                }
            })
            res.status(200).json(filteredPosts);
        } else if (category !== '' && category !== undefined) {
            Object.values(allPosts).forEach(singlePost => {
                if (category === singlePost.category) {
                    filteredPosts.push(singlePost);
                }
            })
            res.status(200).json(filteredPosts);
        } else {
            res.status(400).json('No query parameter entered to fetch filtered Posts');
        }
    }
});

// Get all posts
app.get('/api/v1/getAllPosts', express.json(), (req, res) => {
    res.status(200).json(post.getPosts());
});

// Create a new category
app.post('/api/v1/createNewCategory', express.json(), (req,res) => {
    // const username = req.cookies.sid;
    const username = 'Swapnil';
    const categoryName = req.body.name;
    const allCategories = categories.getAllCategories();

    if (!categoryName) {
        res.status(400).json('Category Name cannot be blank');
    } else {
        Object.keys(allCategories).forEach(category => {
            if (category === categoryName) {
                res.status(400).json('Category Already exists');
            } else {
                const date = new Date();
                const createDate = date.toLocaleDateString() + " " + date.toLocaleTimeString();
                const updateDate = createDate;
                categories.addNewCategory(categoryName, createDate, updateDate);
                res.status(200).json(`New Category ${categoryName} has been added`);
            }
        })
        // res.status(200).json('New Category added')
    }
});

//Get all categories
app.get('/api/v1/getCategories',express.json(), (req,res) => {
    res.status(200).json(categories.getAllCategories());
})

app.get('/api/v1/getAbout',express.json(), (req,res) => {
    const username = req.cookies.username;
    res.status(200).json(userAbout.getUserAboutData(username));
})

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});