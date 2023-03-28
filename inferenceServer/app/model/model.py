from transformers import pipeline

from ..utils.utils import (
    download_youtube_video,
    get_num_total_frames,
    create_gif_from_video,
)

FRAME_SAMPLING_RATE = 4
DEFAULT_MODEL = "facebook/timesformer-base-finetuned-k400"

pipe = pipeline(
    task="video-classification",
    model=DEFAULT_MODEL,
    top_k=2,
    frame_sampling_rate=FRAME_SAMPLING_RATE,
)


def predict(youtube_url_or_file_path):
    if youtube_url_or_file_path.startswith("http"):
        video_path = download_youtube_video(youtube_url_or_file_path)
    else:
        video_path = youtube_url_or_file_path

    # rearrange sampling rate based on video length and model input length
    num_total_frames = get_num_total_frames(video_path)
    num_model_input_frames = pipe.model.config.num_frames
    if num_total_frames < FRAME_SAMPLING_RATE * num_model_input_frames:
        frame_sampling_rate = num_total_frames // num_model_input_frames
    else:
        frame_sampling_rate = FRAME_SAMPLING_RATE

    gif_path, cover_path = create_gif_from_video(
        video_path,
        frame_sampling_rate=frame_sampling_rate,
        gif_path="video.gif",
        cover_path="cover.jpg",
    )

    # run inference
    results = pipe(videos=video_path, frame_sampling_rate=frame_sampling_rate)

    label_to_score = {result["label"]: result["score"] for result in results}

    return label_to_score, gif_path, cover_path
