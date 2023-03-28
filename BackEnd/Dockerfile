FROM python:3.10 as build
WORKDIR /tmp
RUN pip install poetry
COPY ["pyproject.toml", "poetry.lock*", "/tmp/"]
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

FROM python:3.10 as deploy
WORKDIR /videoScribe
COPY --from=build /tmp/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir --upgrade -r ./requirements.txt
COPY ["app/", "/videoScribe/app/"]
COPY ["main.py", "/videoScribe/"]
EXPOSE 8000
CMD ["python", "-m", "main"]