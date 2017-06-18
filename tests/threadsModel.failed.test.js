/**
 * @environment node
 */
global.Promise = require.requireActual('bluebird');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const ThreadSchema = require('../src/models/thread').ThreadSchema;

const testData = require('./testdata/thread.json');

process.env.NODE_ENV = 'test';
const CS = "mongodb://localhost/projectTalkTest";

describe('Test the addLike method', () => {
    let connection;
    let threadModel;
    let thread;
    const author = testData.normalThread.author;

    beforeAll(() => {
        connection = mongoose.createConnection(CS);
        threadModel = connection.model('Thread', ThreadSchema);
    });

    beforeEach(async () => {
        thread = new threadModel(testData.normalThread);
        await thread.save();

    });

    afterEach((done)=>{
        threadModel.remove({}, ()=>{
            done();
        });
        // connection.collections['threads'].drop((err)=>{
        //     if (!err) done();
        // });
        //connection.db.dropDatabase(done);
    });

    afterAll((done) => {
        connection.close(done);
    });

    test('Should return error when already liked', () => {
        return threadModel.addLike(thread.id, author)
            .catch((err) => {
                expect(err).toBeTruthy();
                expect(err.message).toEqual('Already liked or no such thread.');
            });
    });

    test('Should return result when ok', () => {
        const newUser = testData.newAuthor;
        return threadModel.addLike(thread.id, newUser).then((result) => {
            expect(result).toEqual({ n: 1, nModified: 1, ok: 1 });
        }).catch((err)=>{
            expect(err).toBeFalsy();
        });
    });
});
