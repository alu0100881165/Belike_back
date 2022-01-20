import { UserModel } from "../models/user.model";

let exampleUsers: UserModel[] = [
    {
        id: 0,
        username: 'Lana',
        password: '123456#',
    },
    {
        id: 1,
        username: 'Yanira',
        password: '123456#',
    },
    {
        id: 2,
        username: 'Daniel',
        password: '123456#',
    }
];

let nextId: number = 3;

export const findUser = async (id: number): Promise<UserModel | null> => {
    const foundUser = exampleUsers.find(user => user.id === id);

    if(foundUser && foundUser.id >= 0) {
        return foundUser;
    }

    return null;
};

export const createUser = async(newUser: UserModel): Promise<UserModel> => {
    newUser.id = nextId;
    nextId++;

    exampleUsers.push({...newUser});

    return newUser;   
}