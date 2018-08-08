const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: '1',
                userName: 'Tom',
                roomName: 'Udemy'
            },
            {
                id: '2',
                userName: 'Maerry',
                roomName: 'Udemy test'
            },
            {
                id: '3',
                userName: 'Don',
                roomName: 'Udemy'
            }
        ];
    });

    it('should add new user', () => {
        users = new Users();
        const user = {
            id: '123',
            userName: 'Krzysiek',
            roomName: 'Udemy'
        };
        const addedUser = users.addUser(user.id, user.userName, user.roomName);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        const removedUser = users.removeUser('1');
        expect(removedUser).toEqual({
            id: '1',
            userName: 'Tom',
            roomName: 'Udemy'
        });
        expect(users.users).toEqual([
            {
                id: '2',
                userName: 'Maerry',
                roomName: 'Udemy test'
            },
            {
                id: '3',
                userName: 'Don',
                roomName: 'Udemy'
            }
        ]);
    });

    it('should not remove a user if id does not exist', () => {
        const removedUser = users.removeUser('1e');
        expect(removedUser).toEqual({});
    });

    it('should find user', () => {
        const foundUser = users.getUser('1');
        expect(foundUser).toEqual({
            id: '1',
            userName: 'Tom',
            roomName: 'Udemy'
        });
    });

    it('should not find user if id does not exists', () => {
        const foundUser = users.getUser('1a');
        expect(foundUser).toEqual({});
    });

    it('should return list of users for given room Udemy', () => {
        const userList = users.getUserList('Udemy');
        expect(userList).toEqual(['Tom', 'Don']);
    });
    it('should return list of users for given room Udemy test', () => {
        const userList = users.getUserList('Udemy test');
        expect(userList).toEqual(['Maerry']);
    });
});
