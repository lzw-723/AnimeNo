FROM python:3.12-slim

WORKDIR /app

COPY pyproject.toml /app/
COPY poetry.lock /app/

RUN pip install poetry
RUN poetry install --no-dev --no-root

COPY animeno /app/animeno
COPY front /app/front

EXPOSE 8000

CMD ["poetry", "run", "python", "animeno/main.py"]
