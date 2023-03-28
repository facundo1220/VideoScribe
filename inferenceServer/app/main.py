from fastapi import FastAPI, status, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .model import model
from .utils import utils

import os
import base64

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.title = "Inference Server - Video Classification"
app.version = "0.1.0"


@app.get("/", tags=["Home"])
async def welcome():
    message = (
        "Welcome to the Video Classification API. "
        + "Go to '/docs' to understand how to interact with it."
    )
    body = {"data": {"message": message}}
    return JSONResponse(status_code=status.HTTP_200_OK, content=body)


@app.post("/predict", tags=["Prediction"])
async def predict(video: UploadFile):
    videoContent = await video.read()
    videoExtension = video.content_type.split("/")[1]
    videoName = "auxContent." + videoExtension

    with open(videoName, "wb") as fp:
        fp.write(videoContent)

    prediction = model.predict(videoName)

    with open(prediction[1], "rb") as gif_file:
        # read GIF file as binary data
        gif_data = gif_file.read()

        # encode binary data as base64 string
        base64_gif = base64.b64encode(gif_data).decode("utf-8")

    with open(prediction[2], "rb") as cover_file:
        # read cover file as binary data
        cover_data = cover_file.read()

        # encode binary data as base64 string
        base64_cover = base64.b64encode(cover_data).decode("utf-8")

    videoDuration = utils.get_video_duration(videoName)

    body = {
        "filename": video.filename,
        "content-type": video.content_type,
        "prediction": prediction[0],
        "duration": videoDuration,
        "gif_b64": base64_gif,
        "cover_b64": base64_cover,
    }

    os.remove(videoName)
    os.remove(prediction[1])
    os.remove(prediction[2])

    return JSONResponse(status_code=status.HTTP_200_OK, content=body)
