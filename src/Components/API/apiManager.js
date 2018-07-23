class apiManager {
  getField(resource) {
    return fetch(`http://localhost:5002/${resource}`).then(e => e.json());
  }

  allFriends() {
    return fetch(`http://localhost:5002/friends`)
      .then(e => e.json())
      .then(friends => {
        const fList = [];
        const User = sessionStorage.getItem("activeUser");
        friends.forEach(friend => {
          if (friend.yourId == User) {
            fList.push(friend.userId);
          }
        });
        // console.log("API friends", fList)
        return fList;
      });
  }

  getFriendsList(currentUserId) {
    return fetch(
      `http://localhost:5002/friends?_expand=user&yourId=${currentUserId}`
    ).then(e => e.json());
  }

  deleteFriend(relId) {
    return fetch(`http://localhost:5002/friends/${relId}`, {
      method: "DELETE"
    });
  }

  postUser(name, email) {
    return fetch("http://localhost:5002/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    }).then(e => e.json());
  }
  delEvent(id) {
    return fetch(`http://localhost:5002/events/${id}`, {
      method: "DELETE"
    });
  }

  postNews(user, title, url, syn, time) {
    return fetch("http://localhost:5002/news", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        userId: user,
        title: title,
        url: url,
        synopsis: syn,
        timestamp: time
      })
    });
  }

  postTask(user, description, date) {
    return fetch("http://localhost:5002/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user,
        description: description,
        date: date,
        completed: false
      })
    });
  }

  editTask(currentUser, taskId, newDescription, newDate) {
    return fetch(`http://localhost:5002/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: currentUser,
        description: newDescription,
        date: newDate,
        completed: false
      })
    });
  }

  completeTask(taskId) {
    return fetch(`http://localhost:5002/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        completed: true
      })
    });
  }

  postEvent(user, name, loc, date) {
    return fetch("http://localhost:5002/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user,
        name: name,
        location: loc,
        date: date
      })
    });
  }

  postFriend(user, yourid) {
    return fetch("http://localhost:5002/friends", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        userId: user,
        yourId: yourid
      })
    });
  }

  getUser(userId) {
    return fetch(`http://localhost:5002/users/${userId}`).then(e => e.json());
  }

  getUsers() {
    return fetch("http://localhost:5002/users").then(e => e.json());
  }

  ///////////////////////////////////MESSAGES API CALLS////////////////////////////////////////////////
  getMessages() {
    return fetch(
      "http://localhost:5002/messages?_expand=user&_sort=timeStamp&_order=asc"
    ).then(e => e.json());
  }

  postMessage(userId, message, timestamp) {
    return fetch("http://localhost:5002/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        message: message,
        timeStamp: timestamp
      })
    });
  }

  putMessage(msgId, userId, newMessage, messageTimeStamp) {
    return fetch(`http://localhost:5002/messages/${msgId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        message: newMessage,
        timeStamp: messageTimeStamp
      })
    });
  }

  delMessage(msgId) {
    return fetch(`http://localhost:5002/messages/${msgId}`, {
      method: "DELETE"
    });
  }
  ///////////////////////////////////MESSAGES API CALLS////////////////////////////////////////////////

  putEvent(user, name, loc, date, id) {
    return fetch(`http://localhost:5002/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user,
        name: name,
        location: loc,
        date: date
      })
    });
  }

  delNews(id) {
    return fetch(`http://localhost:5002/news/${id}`, {
      method: "DELETE"
    });
  }

  delFriend(id) {
    return fetch(`http://localhost:5002/friends/${id}`, {
      method: "DELETE"
    });
  }
}

const API = new apiManager();
export default API;
