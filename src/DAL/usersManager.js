class UserMangers {
    constructor() {
        this.users = [];
    }

    create(obj) {
        this.users.push(obj);
        return obj;
    }

    findAll() {
        return this.users;
    }
}

export const userManagerInstance = new UserMangers();
