import os
from fastapi import FastAPI, HTTPException, status, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security.api_key import APIKeyHeader
from pydantic import BaseModel, Field
from loguru import logger

from paraphraser.language import LANGUAGE_LIST
from paraphraser.core import create_paraphraser
from config import ORIGINS

API_KEY = os.getenv("API_KEY")
API_KEY_NAME = "X-API-KEY"

app = FastAPI()

origins = ORIGINS

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ParaphraseRequest(BaseModel):
    sentence: str = Field(..., min_length=1)
    language: str

class ParaphraseResponse(BaseModel):
    paraphrase: str

api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

async def get_api_key(api_key_header: str = Depends(api_key_header)):
    if api_key_header != API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API key"
        )
    return api_key_header

@app.get("/", dependencies=[Depends(get_api_key)], tags=["Root"])
async def root():
    logger.info("Received request for root")
    return {"message": "Hello World"}


def split_text_into_chunks(text, chunk_size=1000):
    """Split the text into chunks of a certain size."""
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

@app.post("/paraphrase", response_model=ParaphraseResponse, dependencies=[Depends(get_api_key)], tags=["Paraphrase"])
async def paraphrase(request: ParaphraseRequest):
    logger.info(f"Received request for paraphrasing: {request}")

    if request.language not in LANGUAGE_LIST:
        logger.error(f"Language not supported: {request.language}")
        raise HTTPException(status_code=400, detail="Language not supported")

    text = request.sentence
    res = ""

    chunks = split_text_into_chunks(text)

    paraphraser = create_paraphraser(LANGUAGE_LIST[request.language], "cpu")
    for chunk in chunks:
        sentences = chunk.split('. ')
        for sentence in sentences:
            if sentence.strip() == "":
                continue
            res += paraphraser.paraphrase(sentence) + ". "

    res = res.replace("..", ".")
    logger.info(f"Paraphrased text: {res}")
    return {"paraphrase": res}