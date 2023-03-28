from pathlib import Path
from pytube import YouTube
import numpy as np
from decord import VideoReader
import imageio


def download_youtube_video(url: str):
    yt = YouTube(url)

    streams = yt.streams.filter(file_extension="mp4")
    file_path = streams[0].download()
    return file_path


def sample_frames_from_video(
    file_path: str,
    num_frames: int = 16,
    frame_sampling_rate=1,
):
    videoreader = VideoReader(file_path)
    videoreader.seek(0)

    # sample frames
    start_idx = 0
    end_idx = num_frames * frame_sampling_rate - 1
    indices = np.linspace(start_idx, end_idx, num=num_frames, dtype=np.int64)
    frames = videoreader.get_batch(indices).asnumpy()

    return frames


def get_num_total_frames(file_path: str):
    videoreader = VideoReader(file_path)
    videoreader.seek(0)
    return len(videoreader)


def frames_to_gif(frames, save_path: str = "frames.gif"):
    converted_frames = frames.astype(np.uint8)
    Path(save_path).parent.mkdir(parents=True, exist_ok=True)
    imageio.mimsave(save_path, converted_frames, fps=8)
    return save_path


def frame_to_img(frame, save_path: str = "cover.jpg"):
    img = frame.astype(np.uint8)
    Path(save_path).parent.mkdir(parents=True, exist_ok=True)
    imageio.imwrite(save_path, img)
    return save_path


def create_gif_from_video(
    file_path: str,
    num_frames: int = 16,
    frame_sampling_rate: int = 1,
    gif_path: str = "frames.gif",
    cover_path: str = "cover.jpg",
):
    frames = sample_frames_from_video(
        file_path,
        num_frames,
        frame_sampling_rate,
    )

    return frames_to_gif(frames, gif_path), frame_to_img(frames[0], cover_path)


def get_video_duration(videoPath: str):
    vr = VideoReader(videoPath)
    num_frames = len(vr)
    frame_rate = vr.get_avg_fps()
    duration = num_frames / frame_rate
    return int(duration)
