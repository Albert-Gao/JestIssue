> Finally solve it, shouldn't remove the thread by the same instance, such that when you `save` it the 2nd time, will cause trouble, but the bad part is, you won't get useful error from Jest, you need to figure it out by yourself.


Re-produce an issue where the async timeout happens.

2 Tests are located in the `tests` folder where one could pass but one not.

They are basicly the same, the only difference is the failed test suite will try to clean the DB between each test.
