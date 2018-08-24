lint:
	pug-lint src/templates/*
	sass-lint src/scss/* -v -q --max-warnings=0
	eslint --fix src/js/*
