default:
	@echo "select a task"

publish:
	yarn run build
	npm publish
