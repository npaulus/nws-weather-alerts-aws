var lambdaToolkit = require('aws-lambda-toolkit');
 
if (process.argv[process.argv.length - 1] === 'deploy') {
    // If not using a .awscredentials.json file or aws-cli config
    lambdaToolkit.deploy({
        secretKey: 'SECRET_KEY',
        accessKey: 'ACCESS_KEY'
    });
}
 
if (process.argv[process.argv.length - 1] === 'publish') {
    // If using .awscredentials.json file
    lambdaToolkit.deploy({
      publish: true
    });
}
 
if (process.argv[process.argv.length - 1] === 'test') {
    lambdaToolkit.test();
}