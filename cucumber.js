module.exports = {
  default: {
    require: ['ts-node/register', 'src/hooks.ts', 'src/world.ts', 'src/steps/**/*.ts'],
    paths: ['features/*.feature'],  
    format: [
      'progress',
      'json:reports/cucumber.json'
    ],
    parallel: 1
  }
}
