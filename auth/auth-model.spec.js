const Users = require('./auth-model')

const db = require('../database/dbConfig')

it('using test environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
})

describe('Auth model'), () => {
    beforeEach(async () => {
        await db('users').truncate();
    })


    describe('insert', () => {
        it('should add a user to database', async () => {
            let user = await Users.insert({username:'Michael'})
            expect(user.username).toBe('Michael')

            user = await Users.insert({name:'Tim'});
            expect(user.username).toBe('Tim');

            const users = await db('users');
            expect(users).toHaveLength(2)
        })

    })

    describe('select', () => {
        it('should find a user in the database', async () => {
            let user = await Users.findById({username: 'Michael'})
            expect(user.username).toBe('Michael')
        })
    })
}