(function(angular, undefined) {
  angular.module("galleryApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"operator",
		"admin"
	]
})

;
})(angular);