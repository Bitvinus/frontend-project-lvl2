install:
	npm install
publish:
	npm publish --dry-run
lint:
	npx eslint .
lintFix:
	npx eslint . --fix
gendiff:
	bin/gendiff.js
test:
	npx -n --experimental-vm-modules jest
test-coverage:
	npx -n --experimental-vm-modules jest --coverage
