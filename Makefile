build:
	docker build -t bot-gpt .

run:
	docker run -d -p 3000:3000 --name bot-gpt --rm bot-gpt

