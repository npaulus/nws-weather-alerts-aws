var gulp = require('gulp'),
    lambdaToolkit = require('aws-lambda-toolkit');
 
gulp.task('deploy-to-aws', function () {
    lambdaToolkit.deploy();
});
 
gulp.task('publish-lambda', function () {
    lambdaToolkit.deploy({
      publish: true
    });
});
 
gulp.task('test-lambda', function () {
    lambdaToolkit.test();
});