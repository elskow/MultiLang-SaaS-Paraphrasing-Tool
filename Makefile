ifeq ($(OS),Windows_NT)
	ACTIVATE = venv\Scripts\activate.bat
	OS_DETECTED := Windows
	VENV := python -m venv venv
	RUN_CMD := uvicorn app:app --host 0.0.0.0 --port 8000 --reload
else
	OS_DETECTED := $(shell uname)
	VENV := python3 -m venv venv
	RUN_CMD := granian --interface asgi --host 0.0.0.0 --port 8000 app:app --reload
endif

ifeq ($(OS_DETECTED),Linux)
	ACTIVATE = . venv/bin/activate
else ifeq ($(OS_DETECTED),Darwin)
	ACTIVATE = . venv/bin/activate
else ifeq ($(OS_DETECTED),Windows)
	ACTIVATE = venv\Scripts\activate.bat
else
	$(error Unsupported operating system. Please run on Linux, macOS, or Windows.)
endif

.SILENT: install-be
install-be:
	cd server && $(VENV) && $(ACTIVATE) && pip install -r requirements.txt
	echo "\n\nBackend setup complete. Run 'make run-be' to start the server."

.SILENT: run-be
run-be:
	if [ -d "server/venv" ]; then \
		cd server && $(ACTIVATE) && cd src && $(RUN_CMD); \
	else \
		echo "Error: Virtual environment does not exist. Would you like to create it now? [y/N]"; \
		read answer; \
		if [ "$$answer" = "y" ]; then \
			make venv; \
			cd server && $(ACTIVATE) && cd src && $(RUN_CMD); \
		else \
			echo "Please create the virtual environment first."; \
		fi; \
	fi

freeze:
	cd server && $(ACTIVATE) && pip freeze > requirements.txt

venv:
	$(VENV)

rm-venv:
	cd server && rm -rf venv

.PHONY: install-be run-be venv help
