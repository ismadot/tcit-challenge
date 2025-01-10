import pytest
from app import create_app, db
from flask_migrate import upgrade
from flask import url_for

@pytest.fixture
def app():
    app = create_app()
    app.config.update({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///test.db",
        "SERVER_NAME": "localhost:5000"  # Required for url_for in tests
    })

    with app.app_context():
        # Apply migrations
        upgrade()
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

def test_health_check(client):
    response = client.get(url_for('health_check'))
    assert response.status_code == 200
    assert response.json == {"status": "ok"}

def test_home(client):
    response = client.get(url_for('posts.get_posts'))
    assert response.status_code == 200

def test_create_post(client):
    response = client.post(
        url_for('posts.add_post'),
        json={"name": "Test Post", "description": "This is a test post"}
    )
    assert response.status_code == 201
    assert response.json['name'] == "Test Post"

def test_get_posts(client):
    response = client.get(url_for('posts.get_posts'))
    assert response.status_code == 200
    assert 'posts' in response.json

def test_delete_post(client):
    # Create a post first
    create_response = client
