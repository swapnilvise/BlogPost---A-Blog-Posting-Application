const {v4: uuidv4} = require('uuid');

const posts = {
    "c945aa89-6bd1-4a91-a3ea-eae09bd53882": {
        "title": "Twists and turns of Life",
        "desc": "Life is a series of moments that are connected to each other through the thread of Time. One can draw a parallel to the process of filmmaking where a thousand splendid images captured on a camera are projected on a screen moving at 24 frames per second to give you a cinematic appeal. In life, You are the cinematographer and the actor. Everyone gives their own direction to their story and more often than not, it ends beautifully. We prepare and build ourselves for the climax, but forget to enjoy the engaging process that led to the end. This blog is an initiative that will try to give you the tools for building your beautiful story as well as reminding you to enjoy it. Through the means of this blog, I intend to share my own thoughts and ideas about various things like fitness, books, money, productivity, tech, philosophy and so much more.",
        "username": "Nikharsh",
        "createDate": "8/12/2022 1:12:58 AM",
        "updateDate": "8/12/2022 1:12:58 AM"
    },
    "c945aa89-6bd1-4a91-a3ea-eae09bd53881": {
        "title": "Hamilton, A Cultural Phenomenon And Unrivalled Art.",
        "desc": "As the curtains liftoff, the blanket of silence is consummated with feet stomping beats, powerful lyrics, dazzling lights, crisp choreography, and a choir singing the archetypal rags to riches introduction; How does a bastard orphan, son of a whore and a Scotsman, Dropped in the middle of a forgotten spot…Grow up to be a hero and a scholar” The gripping words with impeccable expressions by the artists make us, the audience, realize the gravity of the situation and it hints towards the rise of a man against the backdrop of impoverishment and slavery. The build-up of the tension is finally resolved when we are greeted with an energetic, Linn Manuel Miranda playing Alexander Hamilton. The phrase, “I am not throwing away my shot! I am Alexander Hamilton” gives us a peek into the man’s resolute. There is a certain sense of urgency that is felt when Miranda takes the center stage. Sure enough, this is one of the major themes of the musical that goes on to define the rest of Hamilton’s life and retrospectively, America’s history. The fact that the musical is more of a hip-hop lyrical exchange subtly introduces the fast pace that Hamilton lived to do a million things that he hasn’t done. This translates into the burning ambition that awes the audience(most of all me). How do you write like you’re running out of time? How do you write every second of your life?Everyone asks these questions to Hamilton at different points of time in the musical, implying the ambitious nature of Alexander Hamilton.The story of Alexander Hamilton is told by many characters from his wife Eliza, to other Founding Fathers of America like George Washington, Thomas Jefferson but most importantly, his arch-nemesis Aron Burr.It’s as much the story of what a person Hamilton was, as is to what a contrasting individual Aron Burr was not. Two equally talented men, with equal opportunities but one of them rises to the top, nonstop. Most of us are mere spectators in the world, dancing to the tune of the melodies set by the go-getters, the ones who write the rules, make history, and are essentially deemed successful. This stark contrast is visible in Hamilton and Burr while the former making strides and working like he’s running out of time, the latter only waiting for it, like the rest of us.",
        "username": "Milind",
        "createDate": "8/12/2022 1:12:58 AM",
        "updateDate": "8/12/2022 1:12:58 AM"
    }
};

function addNewPost(username, title, desc, category, createDate, updateDate) {
    const id = uuidv4();
    posts[id] = {title, desc, username, category, createDate, updateDate};
}

function updatePost(id, username, title, desc, category, createDate, updateDate) {
    posts[id] = {title, desc, category, username, createDate, updateDate};
}

function getPostById(id) {
    return posts[id];
}

function getPosts() {
    return posts;
}

function deletePost(id) {
    delete posts[id];
}

module.exports = {
    addNewPost,
    updatePost,
    getPostById,
    getPosts,
    deletePost
}