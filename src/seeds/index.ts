import db from '../config/connection.js';
import { User } from '../models/index.js';
import cleanDB from './cleanDB.js';

console.log("Seeding...");

const users = [
    {
        "username": "theRealJohnWick",
        "email": "noneof@your.biz",
        "_id": "111111111111111111111111"
    },
    {
        "username": "identityBourne",
        "email": "jason@proton.net",
        "_id": "222222222222222222222222"
    },
    {
        "username": "jReacher",
        "email": "inevercheck@this.email",
        "_id": "333333333333333333333333"
    }
]

try {
    await db();
    await cleanDB();
    const newUsers = await User.insertMany(users);
    console.log(newUsers);
} catch (err) {
    console.log(err);
}