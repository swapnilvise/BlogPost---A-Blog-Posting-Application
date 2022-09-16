function getPosts() {
    return fetch('/api/v1/getAllPosts', {
        method: 'GET',
    }).catch(() => {
        return Promise.reject({ error: 'Loading Error, Cannot Get Posts' })
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json()
                .catch((error) => Promise.reject({ error }))
                .then(err => Promise.reject(err));
            }
        }).then(posts => {
            return posts;
        });
}

function getPostById(id) {
    return fetch(`/api/v1/getPost/${id}`, {
        method: 'GET',
    }).catch(() => {
        return Promise.reject({ error: 'Loading Error, Cannot Get Posts' })
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json()
                .catch((error) => Promise.reject({ error }))
                .then(err => Promise.reject(err));
            }
        }).then(posts => {
            return posts;
        });
}

function checkForLoggedInUser() {
    return fetch('/api/v1/getCurrentUser', {
        method: 'GET'
    }).catch(() => {
        return Promise.reject({ error: 'Error fetching logged in user' })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch((error) => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

function performLogin(username) {
    return fetch('/api/v1/login', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ username }),
    }).catch(() => {
        return Promise.reject({ error: 'Cannot Login' })
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
            .catch((error) => Promise.reject({ error }))
            .then(err => Promise.reject(err));
        });
}

function performLogout(username) {
    return fetch('/api/v1/logout', {
        method: 'POST'
    }).catch(() => {
        return Promise.reject({ error: 'Cannot Logout' })
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
            .catch((error) => Promise.reject({ error }))
            .then(err => Promise.reject(err));
        });
}

function submitPost(post) {
    const title = post.title;
    const desc = post.desc;
    const category = post.category;
    return fetch('/api/v1/createPost', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ title, desc }),
    }).catch(() => {
        return Promise.reject({ error: 'Cannot Post' })
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch((error) => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

function addUser(newUser, userAbout) {
    const username = newUser.username;
    const email = newUser.email;
    const about = userAbout.about;
    return fetch('/api/v1/register', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ username, email, about }),
    }).catch(() => {
        return Promise.reject({ error: 'Cannot Register User' })
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch((error) => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

function deletePost(id) {
    return fetch(`/api/v1/deletePost/${id}`, {
        method: 'DELETE'
    }).catch(() => {
        return Promise.reject({ error: 'Error deleting post' })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch((error) => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

function updatePost(id, post) {
    const title = post.title;
    const desc = post.desc;
    return fetch(`/api/v1/updatePost/${id}`, {
        method: 'PUT',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ title, desc }),
    }).catch(() => {
        return Promise.reject({ error: 'Cannot Post' })
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch((error) => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

function updateUser(username, email) {
    return fetch(`/api/v1/${username}`, {
        method: 'PUT',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ username, email }),
    }).catch(() => {
        return Promise.reject({ error: 'Cannot Post' })
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch((error) => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

function getAboutsection() {
    return fetch('/api/v1/getAbout', {
        method: 'GET'
    }).catch(() => {
        return Promise.reject({ error: 'Error fetching logged in user' })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch((error) => Promise.reject({ error }))
        .then(err => Promise.reject(err));
    });
}

module.exports = {
    getPosts,
    getPostById,
    checkForLoggedInUser,
    performLogin,
    performLogout,
    submitPost,
    addUser,
    deletePost,
    updatePost,
    updateUser,
    getAboutsection
}