define('ibm/baas/service/IBMCloudCode', ['require', 'exports', 'module', './location/IBMCloudCodeService'], function (require, exports, module, IBMCloudCodeService) {
  var __umodule__ = (function (require, exports, module, IBMCloudCodeService) {
  

var IBMCloudCode = {
      VERSION: "{{ VERSION }}",
      _cc: null,
      initializeService: function () {
        if (!(IBMBaaS && Q && _ && IBMXhr)) {
          throw new IBMError("IBMBaaS or {Q,_,IBMXhr} are undefined., this usually means you have not pre loaded the IBMBaaS module");
        }
        this._cc = new IBMCloudCodeService();
        if (!_.isObject(this._cc)) {
          throw new IBMError("Failed to create an IBM CloudService Object");
        }
        return this._cc;
      },
      getVersion: function () {
        return this.VERSION;
      },
      getService: function () {
        if (!this._cc) {
          throw new IBMError("CloudCode Service not initialized. Call initializeService()");
        }
        return this._cc;
      }
    };
  return IBMCloudCode;


}).call(this, require, exports, module, IBMCloudCodeService);
var __old__ibmcloud_code0 = window['IBMCloudCode'];
window['IBMCloudCode'] = __umodule__;

__umodule__.noConflict = function () {
  window['IBMCloudCode'] = __old__ibmcloud_code0;
return __umodule__;
};
return __umodule__;
})