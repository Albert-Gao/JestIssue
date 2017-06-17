Re-produce an issue where the async timeout happens.

2 Tests are located in the `tests` folder where one could pass but one not.

They are basicly the same, the only difference is the failed test suite will try to clean the DB between each test.

If you only test the failed suite, it will show mongoose's warning message:
> DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html

The message shouldn't be there since I have already set the mongoose Promise to Bluebird in the `mongodb.js`.

According to the document, it said:
> Most commonly this is being caused by conflicting Promise implementations.

Which just match the above error. But I don't know what happened here, since I already set the mongoose promise when I first connect to it.