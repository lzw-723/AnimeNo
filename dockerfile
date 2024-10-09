FROM python:3.12-slim

WORKDIR /app

COPY animeno front poetry.lock pyproject.toml ./

RUN pip install poetry

RUN poetry install --no-dev --no-root

EXPOSE 8000

CMD ["poetry", "run", "python", "animeno/main.py"]