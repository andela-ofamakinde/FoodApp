describe("Get All Foods", function() {
    var Foods,
        $httpBackend,
        foodRequestHandler,
        API_URL = 'http://localhost:8080/food',
        mockResponse = {data: [1,2,3]};

    beforeEach(angular.mock.module("FoodApp.factories"));

    beforeEach(inject(function($injector) {
        Foods = $injector.get('Foods');
    }));

    it("should exist", function() {
        expect(Foods).toBeDefined();
    });

    describe('./getall', function() {
        beforeEach(inject(function($injector) {
            mockService = $injector.get('Foods');
            $httpBackend = $injector.get('$httpBackend');
            foodRequestHandler = $httpBackend.when('GET', API_URL + '/all').respond(mockResponse);
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should exist', function() {
            expect(Foods.getAll).toBeDefined();
        })       

        it('should fetch all data', function() {
            mockService.getAll().then(function(res) {
                expect(res.data).toEqual(mockResponse);
            })
            $httpBackend.flush();
        });


    })
})