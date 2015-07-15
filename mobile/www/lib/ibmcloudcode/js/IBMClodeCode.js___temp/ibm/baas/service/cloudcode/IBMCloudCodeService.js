define('ibm/baas/service/cloudcode/IBMCloudCodeService', function (require, exports, module) {
  

function IBMCloudCodeService(appName) {
    this.setAppName(appName);
  }
  ;
  IBMCloudCodeService.prototype = {
    _baseUrl: null,
    appName: null,
    setAppName: function (appName) {
      if (!_.isString(appName)) {
        throw new IBMError("Application Name has not been passed into CloudCode service");
      }
      this.appName = appName;
      var uri = new IBMUriBuilder(IBMBaaS.getBaaSURL());
      uri.slash().append(appName).slash();
      uri.append(IBMBaaS.getApplicationId()).slash();
      this._baseUrl = uri;
    },
    getAppName: function () {
      return this.appName;
    },
    invoke: function (resource) {
      if (!resource || resource === undefined) {
        throw new IBMError("Invalid resource name passed to invoke");
      }
      var defer = Q.defer();
      var _url = _.clone(this._baseUrl);
      _url.append(resource);
      defer.resolve();
      return defer.promise;
    },
    invokeGet: function () {
    },
    invokePost: function () {
    },
    invokePut: function () {
    },
    invokeDel: function () {
    },
    httpRequest: function () {
    }
  };
  return IBMCloudCodeService;


})