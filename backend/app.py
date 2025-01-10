from flask import Flask, jsonify
from flask_cors import CORS
from models import db
from routes.posts import posts
from config import Config
from flask_migrate import Migrate
import logging
import os
from sqlalchemy.exc import OperationalError
from sqlalchemy.sql import text
from dotenv import load_dotenv
from colorlog import ColoredFormatter

load_dotenv()


# Configure logging with colors
formatter = ColoredFormatter(
    "%(log_color)s%(levelname)s: %(message)s",
    log_colors={
        'DEBUG': 'white',
        'INFO': 'green',
        'WARNING': 'yellow',
        'ERROR': 'red',
        'CRITICAL': 'bold_red',
    }
)
handler = logging.StreamHandler()
handler.setFormatter(formatter)
logging.getLogger().addHandler(handler)
logging.getLogger().setLevel(logging.INFO)

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    Migrate(app, db)

    # Register blueprints
    app.register_blueprint(posts, url_prefix='/posts')

    # Healthcheck endpoint
    @app.route('/health', methods=['GET'])
    def health_check():
        return jsonify({"status": "ok"}), 200

    # Log database connection
    if 'DATABASE_URL' in os.environ:
        logging.info(f"Connected to PostgreSQL: {app.config['SQLALCHEMY_DATABASE_URI']}")
    else:
        logging.info("No DATABASE_URL found. Defaulting to SQLite: default.db")

    with app.app_context():
        try:
            # Apply migrations if necessary
            from flask_migrate import upgrade, init, migrate
            if not os.path.exists('migrations'):
                logging.info("No migrations found. Initializing migrations directory.")
                init()
            logging.info("Running migration scripts...")
            migrate()
            upgrade()
            logging.info("Migrations applied successfully.")

            # Check if the 'posts' table exists
            db.session.execute(text('SELECT 1 FROM posts LIMIT 1'))
            logging.info("Database is ready and connected to an existing table.")
        except OperationalError as e:
            logging.warning("Database not initialized or table 'posts' does not exist. Error: %s", e)
    return app



if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    app = create_app()
    app.run(debug=True)
