/**
 * Created by asqwrd on 2/28/2016.
 */
var ApiService = (function () {
    function ApiService() {
        this.api_domain = 'http://192.168.1.223:3000';
    }
    ApiService.prototype.getApiDomain = function () {
        return this.api_domain;
    };
    ApiService.prototype.setApiDomain = function (domain) {
        this.api_domain = domain;
    };
    return ApiService;
})();
exports.ApiService = ApiService;
