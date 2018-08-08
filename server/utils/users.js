class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, userName, roomName) {
        const user = {
            id,
            userName,
            roomName
        };
        this.users = [...this.users, user];
        return user;
    }
    removeUser(id) {
        let removedUser = {};
        const userListAfterRemoval = this.users.filter(user => {
            if (user.id === id) {
                removedUser = Object.assign({}, user);
            }
            return user.id !== id;
        });
        this.users = [...userListAfterRemoval];

        return removedUser;
    }
    getUser(id) {
        const foundUser = this.users.filter(user => {
            return user.id === id;
        });

        return foundUser.length ? foundUser[0] : {};
    }
    getUserList(roomName) {
        let userList = this.users.reduce((userList, user) => {
            if (user.roomName === roomName) {
                userList = [...userList, user.userName];
            }
            return userList;
        }, []);

        return userList;
    }
}

module.exports = { Users };
