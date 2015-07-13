/* Used to bootstrap our tests*/
function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}
/* TODO: find out what the 1st param in describe is for*/
describe("What is this for ?", function () {
    beforeEach(function () {
       console.log("running something before each test");
       //this.server = http.createServer(app).listen(3000);
    });
    
    importTest("site", './controllers/siteTest');
    
    after(function (done) {
        console.log("after all tests");
        process.exit(0);
    });
});
