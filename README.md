This is a utility project to help you download and run Fintegrate's infrastructure.

1. To get started, create a folder where all the repositories will be cloned and clone this repository inside:
```bash
git clone https://github.com/fintegrate-practicum/infrastructure.git
cd infrastructure
```

2. Execute the `./git-clone.sh` script, it should clone all the necessary repositories.

3. Put the `.env` file in the `infrastructure` folder.

4. To start the docker containers, run this command:
```bash
docker-compose up -d
```
