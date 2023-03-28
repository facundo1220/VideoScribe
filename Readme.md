<div align="center">

<div align=center>

![Logo](./FrontEnd/src/images/Logo.png)

</div>

Julian Adolfo Vega - 2232569

Joyd Esteban Lasprilla - 2232563

Jorge Andres Facundo - 2232565

---

<div align ="justify">

The next project is a web application that uses Machine Learning to extract information from videos and organize them in an easy-to-use library. With Video Organizer, users can upload videos in different formats and the app will automatically process metadata and preview images. Users can search and filter the library using key terms and keywords.

The project in general is divided in 3 fundamental fields.

* **SPA (Single Page App):** In charge of the direct interation with the user where can call the service necesarys to make interactions like register, login and create and modify videos.
  * **Technologies used:** React/Vite, JavaScript.
* **Videos microservice:** In charge of recibe the user petitions based in REST protocol where using fundamentals functions like GET, POST, DELETE and PUT we can realize a comunication with a PostgreSQL database (SQL) to create or modify videos.
  * **Technologies used:** Python, FastApi, PostgreSQL, Cloud Storage.
* **ML microservice:** In charge of the predicting the metadata of user posted videos using a hugging face model of video classification through transformers.
  * **Technologies used:** Python, FastApi, Hugging Face.

We can see this principal fields in the following architecture:

## Architecture

<div align=center>

![Architecture](./Images/Architecture.png)

</div>

## Solution description

* **How will your solution be used? :** This platform helps users to categorize their videos and view all videos separated by category from the database. It is an application that not only helps users to categorize their videos but also allows them to explore different views of a video of the same category. 

* **What are the current solutions/workarounds (if any)? :** There are several platforms that can automatically detect the categories of a video. Here are some of them:

   - Google Cloud Video Intelligence API: This is an artificial intelligence API that allows the detection of objects and scenes in videos. It can identify elements such as people, animals, vehicles and landscapes, and assign tags to videos based on their content.

   - Amazon Rekognition Video: This is a service for detecting objects, scenes and activities in videos, with the ability to detect explicit content and track moving objects.

   - IBM Watson Video Analyzer: This platform offers detection of scenes, objects, faces and emotions in videos, and can also generate automatic summaries of them.

   - Clarifai Video Recognition: This is an artificial intelligence platform that allows the detection of objects, scenes and people in videos, and also offers the possibility of training customized models to detect specific categories.

* **How would you solve the problem manually? :** This problem would be solved manually in the following way an individual should watch the video attentively and once the video is analyzed he should note the categories of the video watched, once this is done he should store the information in his respective database.
<div>

</div>
