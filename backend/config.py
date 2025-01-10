from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///default.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key')

    @staticmethod
    def init_app(app):
        db_url = os.getenv('DATABASE_URL')
        if db_url:
            app.config['SQLALCHEMY_DATABASE_URI'] = db_url
