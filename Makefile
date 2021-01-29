install: install-deps

gendiff:
	node src/bin/gendiff.js

run:
	bin/nodejs-package.js

install-deps:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test