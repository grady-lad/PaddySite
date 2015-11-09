/* Used to bootstrap our tests*/
function importTest(name, path) {
  describe(name, function () {
    require(path);
  });
}
/* TODO: find out what the 1st param in describe is for*/
describe("Running test suite", function () {
  /** Controller Test's **/
  importTest("Running homepage test suite", './controllers/siteTest');
  importTest("Running homepage test suite", './controllers/userTest');
  /** Model Tests **/
  importTest('Running photo model Tests', './models/photoTest');
  after(function (done) {
    console.log("Shutting down Server");
    done();
    //process.exit(0);
  });
});
