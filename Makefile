build:
	go mod tidy
	go build

release:
	bash release.bash