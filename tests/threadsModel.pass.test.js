/**
 * @environment node
 */
const mongoDB = require('../src/config/mongodb');
const ThreadModel = require('../src/models/thread');

const testData = require('./testdata/thread.json');

process.env.NODE_ENV = 'test';


describe('Test the addLike method', () => {
    const thread = new ThreadModel(testData.normalThread);
    const author = testData.normalThread.author;

    beforeAll(() => {
        mongoDB.connect();
        return thread.save();
    });

    afterAll((done) => {
        ThreadModel.remove({}, () => {
            mongoDB.disconnect();
            done();
        });
    });

    test('Should return error when already liked', () => {
        return ThreadModel.addLike(thread.id, author)
            .catch((err) => {
                expect(err).toBeTruthy();
                expect(err.message).toEqual('Already liked or no such thread.');
            });
    });
    
    test('Should return result when ok', () => {
        const newUser = testData.newAuthor;
        return ThreadModel.addLike(thread.id, newUser).then((result) => {
            expect(result).toEqual({ n: 1, nModified: 1, ok: 1 });
        });
    });
});