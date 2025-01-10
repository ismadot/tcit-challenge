from flask import Flask
from models import db
from routes.posts import posts
from config import Config
from flask_migrate import Migrate
import logging
import os
from sqlalchemy.exc import OperationalError
from sqlalchemy.sql import text

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    Migrate(app, db)

    # Register blueprints
    app.register_blueprint(posts, url_prefix='/posts')

    # Log database connection
    if 'sqlite' in app.config['SQLALCHEMY_DATABASE_URI']:
        logging.info("Connected to SQLite: default.db")
    else:
        logging.info(f"Connected to PostgreSQL: {app.config['SQLALCHEMY_DATABASE_URI']}")

    with app.app_context():
        try:
            db.session.execute(text('SELECT 1 FROM posts LIMIT 1'))
            logging.info("Database is ready.")
        except OperationalError:
            logging.info("Database not initialized. Running migrations...")
            from flask_migrate import upgrade, init, migrate
            if not os.path.exists('migrations'):
                init()
            migrate()
            upgrade()

    return app

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    app = create_app()
    app.run(debug=True)
