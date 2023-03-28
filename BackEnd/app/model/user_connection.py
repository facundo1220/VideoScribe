import psycopg2
from typing import List
import os

# Conectarme a la base de datos cada vez que ejecute esta clase
# Esta va a instanciarme la conexion a la base de datos.


class UserConnection:
    conn = None

    # Constructor
    def __init__(self):
        try:
            # conexion a la base de datos videosscribe_p
            self.conn = psycopg2.connect(
                database=os.environ.get("PG_DATABASE", "videoscribe"),
                user=os.environ.get("PG_USER", "postgres"),
                password=os.environ.get("PG_PASSWORD", "VS_pass@db"),
                host=os.environ.get("PG_HOST", "localhost"),
                port=os.environ.get("PG_PORT", "5432"),
            )
            # Verificar si las tablas existen y, si no existen, crearlas
            if not self.tables_exist():
                self.create_tables()
        except psycopg2.OperationalError as err:
            print(err)
            self.conn.close()

    # Función para verificar si las tablas existen en la base de datos
    def tables_exist(self):
        with self.conn.cursor() as cur:
            cur.execute(
                """
                SELECT EXISTS(SELECT 1 FROM pg_catalog.pg_class
                WHERE relname = 'users')
                """
            )
            user_exist = cur.fetchone()[0]
            cur.execute(
                """
                SELECT EXISTS(SELECT 1 FROM pg_catalog.pg_class
                WHERE relname = 'videos')
                """
            )
            videos_exist = cur.fetchone()[0]
        return user_exist and videos_exist

    # Función para crear las tablas en la base de datos
    def create_tables(self):
        with self.conn.cursor() as cur:
            # Verificar si la tabla User existe
            cur.execute(
                """
                SELECT EXISTS(SELECT 1 FROM pg_catalog.pg_class
                WHERE relname = 'users')
                """
            )
            user_exist = cur.fetchone()[0]

            # Si la tabla no existe, crearla
            if not user_exist:
                cur.execute(
                    """
                    CREATE TABLE IF NOT EXISTS "users" (
                        idUser SERIAL PRIMARY KEY,
                        Email VARCHAR(255) NOT NULL,
                        Password VARCHAR(255) NOT NULL,
                        Name VARCHAR(255) NOT NULL
                    )
                    """
                )

            # Verificar si la tabla videos existe
            cur.execute(
                """
                SELECT EXISTS(SELECT 1 FROM pg_catalog.pg_class
                WHERE relname = 'videos')
                """
            )
            videos_exist = cur.fetchone()[0]

            # Si la tabla no existe, crearla
            if not videos_exist:
                cur.execute(
                    """
                    CREATE TABLE IF NOT EXISTS videos (
                        idVideo SERIAL PRIMARY KEY,
                        idUser INTEGER REFERENCES "users"(idUser),
                        title VARCHAR(255) NOT NULL,
                        privacy VARCHAR(255) NOT NULL,
                        video VARCHAR(255) NOT NULL,
                        duration INTEGER NOT NULL,
                        cover VARCHAR(255) NOT NULL,
                        gif VARCHAR(255) NOT NULL,
                        category TEXT[] NOT NULL,
                        date DATE
                    )
                    """
                )
            self.conn.commit()

    # Funcion para insertar datos en la db videosscribe en la tabla User
    def write(self, data):
        # Contexto donde funciona la db abre y la cierra
        with self.conn.cursor() as cur:
            cur.execute(
                """
                    INSERT INTO users(email, password,name)
                    VALUES(%(email)s, %(password)s,%(name)s)
                """,
                data,
            )
            self.conn.commit()

    # Login para la db videosescribe
    def authenticate_user(self, email: str, password: str):
        cur = self.conn.cursor()
        cur.execute(
            "SELECT email, password FROM users WHERE Email = %s",
            (email,),
        )
        user = cur.fetchone()
        if user is None:
            return False
        db_email, db_password = user
        if not password == db_password:
            return False
        return db_email

    def return_id(self, email_v: str):
        with self.conn.cursor() as cur:
            query = "SELECT idUser FROM users WHERE Email = %s "
            cur.execute(query, (email_v,))
            data = cur.fetchall()
            id = data[0][0]
            return id

    # Funcion para leer todo en la DB videosscribe en la tabla de videoss
    def read_all(self):
        with self.conn.cursor() as cur:
            data = cur.execute("SELECT * FROM videos;")
            data = cur.fetchall()
            return data

    # Funcion para traer todos los videoss de un usuario
    # utilizando el name del usuario:
    def all_videos_4_one(self, idUser: str):
        with self.conn.cursor() as cur:
            query = """
            SELECT users.Name,videos.idUser, videos.idVideo, videos.title,
            videos.privacy, videos.video, videos.duration, videos.cover,
            videos.gif, videos.category, videos.date
            FROM users
            JOIN videos ON users.idUser = videos.idUser
            WHERE users.idUser = %s
            """
            cur.execute(query, (idUser,))
            data = cur.fetchall()
            return data

    # Funcion para obtener un videos por el id de videos
    def find_video_by_id(self, idVideo: str):
        with self.conn.cursor() as cur:
            query = """
                SELECT users.Name,videos.idUser,videos.idVideo, videos.title,
                videos.privacy, videos.video, videos.duration, videos.cover,
                videos.gif, videos.category, videos.date
                FROM users
                JOIN videos ON users.idUser = videos.idUser
                WHERE  videos.idVideo = %s
                """
            cur.execute(query, (idVideo))
            data = cur.fetchone()
            return data

    # Funcion para borrar videoss de la tabla videoss
    def delete_video_by_title(self, id_video: str):
        with self.conn.cursor() as cur:
            # Eliminar el videos por su ID
            query = "DELETE FROM videos WHERE idVideo = %s"
            cur.execute(query, (id_video,))
            self.conn.commit()

        # Retornar el número de filas afectadas
        # (debe ser 1 si el videos fue eliminado correctamente)
        return cur.rowcount

    # Funcion para insertar datos a la tabla videos
    def post_video_by_idUser(
        self,
        idUser: str,
        title: str,
        privacy: str,
        video: str,
        duration: str,
        cover: str,
        gif: str,
        category: List[str],
    ):
        with self.conn.cursor() as cur:
            query = """
            INSERT INTO videos (idUser, title, privacy, video, duration,
            cover, gif, category, date)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, CURRENT_DATE)
            RETURNING idVideo
            """
            cur.execute(
                query,
                (
                    idUser,
                    title,
                    privacy,
                    video,
                    duration,
                    cover,
                    gif,
                    category,
                ),
            )
            self.conn.commit()
            data = cur.fetchone()[0]
            return data

    # Destructor
    def __def__(self):
        self.conn.close()
