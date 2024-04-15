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

install:
	$(VENV) && $(ACTIVATE) && cd src && pip install -r requirements.txt

run:
	$(ACTIVATE) && cd src && $(RUN_CMD)