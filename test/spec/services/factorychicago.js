'use strict';

describe('Service: FactoryChicago', function () {

  // load the service's module
  beforeEach(module('d3AngularApp'));

  // instantiate service
  var FactoryChicago;
  beforeEach(inject(function (_FactoryChicago_) {
    FactoryChicago = _FactoryChicago_;
  }));

  it('should do something', function () {
    expect(!!FactoryChicago).toBe(true);
  });

});
