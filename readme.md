# starting the test suite server

- npm install ( mocha / chai )
- npm test
- access test suite at https://localhost:1337 (pay attention to the https protocol)
- enable ES modules on your browser ( firefox: about:config => dom.moduleScripts.enabled )
- add exception for the self-signed certificate

# adding a test
- add your test suite in /specs/src
- import your test suite in /specs/specs.mjs

# adding a route (eg, if you want to place files outside /lib ; if you want to create a sample page without test ; ...)
- add your file in specs/routes
- import your route in specs/routes/index.mjs
