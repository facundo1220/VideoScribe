import os
import base64
from fastapi import FastAPI, Body, status, UploadFile, File, Form
from .model.user_connection import UserConnection
from .schema.user_schema import UserSchema, Video
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
from fastapi.responses import JSONResponse
from typing import List, Annotated
from google.cloud import storage
from google.oauth2 import service_account
import shutil

app = FastAPI()
conn = UserConnection()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

path_to_sa = os.environ.get("PATH_TO_SA", "./videoscribe-sa.json")
credentials = service_account.Credentials.from_service_account_file(path_to_sa)
client = storage.Client(credentials=credentials)
bucket = client.get_bucket("videoscribe-bucket")


# Request to register users
@app.post("/signin")
def insert(user_data: UserSchema = Body()):
    data = user_data.dict()
    data.pop("id")
    try:
        conn.write(data)
        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={"message": "successfully registered"},
        )
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Error inserting data"},
        )


# Login Request
@app.post("/login")
async def login(email: str = Body(), password: str = Body()):
    userValidation = conn.authenticate_user(email, password)
    if not userValidation:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "Wrong email or password"},
        )
        # raise HTTPException(status_code=400,
        # detail="Correo electrónico o contraseña incorrectos")
    id = conn.return_id(userValidation)
    return JSONResponse(status_code=status.HTTP_200_OK, content={"idUser": id})


# GET all videos
@app.get("/videos")
def get_all_videos():
    try:
        items = []
        for data in conn.read_all():
            dictionary = {}

            videoPath = data[4]
            coverPath = data[6]
            gifPath = data[7]

            videoBlob = bucket.blob(videoPath)
            coverBlob = bucket.blob(coverPath)
            gifBlob = bucket.blob(gifPath)

            # Create directories temporarily if they don't exist
            os.makedirs(os.path.dirname(videoPath), exist_ok=True)
            os.makedirs(os.path.dirname(coverPath), exist_ok=True)
            os.makedirs(os.path.dirname(gifPath), exist_ok=True)

            videoBlob.download_to_filename(videoPath)
            coverBlob.download_to_filename(coverPath)
            gifBlob.download_to_filename(gifPath)

            with open(videoPath, "rb") as video_file:
                # read GIF file as binary data
                video_data = video_file.read()

                # encode binary data as base64 string
                base64_video = base64.b64encode(video_data).decode("utf-8")

            with open(coverPath, "rb") as cover_file:
                # read GIF file as binary data
                cover_data = cover_file.read()

                # encode binary data as base64 string
                base64_cover = base64.b64encode(cover_data).decode("utf-8")

            with open(gifPath, "rb") as gif_file:
                # read GIF file as binary data
                gif_data = gif_file.read()

                # encode binary data as base64 string
                base64_gif = base64.b64encode(gif_data).decode("utf-8")

            shutil.rmtree("users")

            dictionary["idvideo"] = data[0]
            dictionary["iduser"] = data[1]
            dictionary["title"] = data[2]
            dictionary["privacy"] = data[3]
            dictionary["video"] = base64_video
            dictionary["duration"] = data[5]
            dictionary["cover"] = base64_cover
            dictionary["gif"] = base64_gif
            dictionary["category"] = data[8]
            dictionary["date"] = data[9]
            items.append(dictionary)

        return items
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        return {"message": "No data obtained"}


# Request to GET all videos of a user
@app.get("/video/{iduser}")
def get_videos_by_username(iduser: str):
    try:
        data = conn.all_videos_4_one(iduser)
        if not data:
            message = "No videos found for the specified user"
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"message": message},
            )

        # Create a list of Video objects
        # from the query results
        videos = []
        for row in data:
            # Convert the date object to a string
            video_date = row[10].strftime("%Y-%m-%d")

            videoPath = row[5]
            coverPath = row[7]
            gifPath = row[8]

            videoBlob = bucket.blob(videoPath)
            coverBlob = bucket.blob(coverPath)
            gifBlob = bucket.blob(gifPath)

            # Create directories temporarily if they don't exist
            os.makedirs(os.path.dirname(videoPath), exist_ok=True)
            os.makedirs(os.path.dirname(coverPath), exist_ok=True)
            os.makedirs(os.path.dirname(gifPath), exist_ok=True)

            videoBlob.download_to_filename(videoPath)
            coverBlob.download_to_filename(coverPath)
            gifBlob.download_to_filename(gifPath)

            with open(videoPath, "rb") as video_file:
                # read GIF file as binary data
                video_data = video_file.read()

                # encode binary data as base64 string
                base64_video = base64.b64encode(video_data).decode("utf-8")

            with open(coverPath, "rb") as cover_file:
                # read GIF file as binary data
                cover_data = cover_file.read()

                # encode binary data as base64 string
                base64_cover = base64.b64encode(cover_data).decode("utf-8")

            with open(gifPath, "rb") as gif_file:
                # read GIF file as binary data
                gif_data = gif_file.read()

                # encode binary data as base64 string
                base64_gif = base64.b64encode(gif_data).decode("utf-8")

            shutil.rmtree("users")

            # create video object
            video = Video(
                name=row[0],
                iduser=row[1],
                idvideo=row[2],
                title=row[3],
                privacy=row[4],
                video=base64_video,
                duration=row[6],
                cover=base64_cover,
                gif=base64_gif,
                category=row[9],
                date=video_date,
            )
            # Add object to video list
            videos.append(video)
        return videos

    except (Exception, psycopg2.Error) as error:
        print("Error connecting to database: ", error)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": "Error connecting to database"},
        )


@app.delete("/delete/{id_video}")
async def delete_video(id_video: str):
    data = conn.find_video_by_id(id_video)

    videoPath = data[5]
    coverPath = data[7]
    gifPath = data[8]

    # Get a reference to the blob (file) you want to delete
    videoBlob = bucket.blob(videoPath)
    coverBlob = bucket.blob(coverPath)
    gifBlob = bucket.blob(gifPath)

    # Delete the blob
    videoBlob.delete()
    coverBlob.delete()
    gifBlob.delete()

    result = conn.delete_video_by_title(id_video)
    if result == 0:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"message": "The video could not be deleted"},
        )
    else:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"message": "The video was successfully removed"},
        )


@app.post("/create/{idUser}")
async def create_video(
    idUser: str,
    title: Annotated[str, Form()],
    privacy: Annotated[str, Form()],
    duration: Annotated[float, Form()],
    category: Annotated[List[str], Form()],
    cover: Annotated[str, Form()],
    gif: Annotated[str, Form()],
    video_file: Annotated[UploadFile, File()],
):
    # Create a file path based on user and video information

    parentDir = f"users/{idUser}/{title}"
    video_file_path = parentDir + "/videos/" + video_file.filename

    fileName = video_file.filename.split(".")[0]

    cover_file_path = parentDir + "/covers/" + fileName + ".jpg"
    gif_file_path = parentDir + "/gifs/" + fileName + ".gif"

    videoBlob = bucket.blob(video_file_path)
    coverBlob = bucket.blob(cover_file_path)
    gifBlob = bucket.blob(gif_file_path)

    # Create directories temporarily if they don't exist
    os.makedirs(os.path.dirname(video_file_path), exist_ok=True)
    os.makedirs(os.path.dirname(cover_file_path), exist_ok=True)
    os.makedirs(os.path.dirname(gif_file_path), exist_ok=True)

    cover_bytes = base64.b64decode(cover)
    gif_bytes = base64.b64decode(gif)

    with open(video_file_path, "wb") as f:
        f.write(video_file.file.read())

    with open(cover_file_path, "wb") as f:
        f.write(cover_bytes)

    with open(gif_file_path, "wb") as f:
        f.write(gif_bytes)

    videoBlob.upload_from_filename(video_file_path)
    coverBlob.upload_from_filename(cover_file_path)
    gifBlob.upload_from_filename(gif_file_path)

    shutil.rmtree("users")

    # Insert video data into the database
    data = conn.post_video_by_idUser(
        idUser,
        title,
        privacy,
        video_file_path,
        duration,
        cover_file_path,
        gif_file_path,
        category,
    )

    # Return a success response
    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content={"message": f"Video {data} created for user {idUser}"},
    )
