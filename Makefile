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

install-be:
	cd server && $(VENV) && $(ACTIVATE) && pip install -r requirements.txt

run-be:
	cd server && $(ACTIVATE) && cd src && $(RUN_CMD)

freeze:
	cd server && $(ACTIVATE) && pip freeze > requirements.txt

venv:
	$(VENV)

rm-venv:
	cd server && rm -rf venv

.PHONY: install-be run-be venv help
