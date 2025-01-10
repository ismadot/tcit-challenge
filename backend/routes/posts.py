from flask import Blueprint, request, jsonify
from models import db, Post
from schemas import post_schema, posts_schema

posts = Blueprint('posts', __name__)

@posts.route('', methods=['GET'])
def get_posts():
    name_filter = request.args.get('name', None)  # Filtrar por nombre (opcional)
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    query = Post.query
    if name_filter:
        query = query.filter(Post.name.ilike(f"%{name_filter}%"))

    posts_query = query.paginate(page=page, per_page=per_page, error_out=False)
    total_posts = query.count()
    result = {
        "posts": posts_schema.dump(posts_query.items),
        "total": total_posts
    }
    return jsonify(result)

@posts.route('', methods=['POST'])
def add_post():
    data = request.json
    new_post = Post(name=data['name'], description=data['description'])
    db.session.add(new_post)
    db.session.commit()
    return post_schema.jsonify(new_post), 201

@posts.route('/<int:id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get_or_404(id)
    db.session.delete(post)
    db.session.commit()
    return post_schema.jsonify(post)

@posts.route('/<int:id>', methods=['PUT'])
def update_post(id):
    post = Post.query.get_or_404(id)
    data = request.json

    if 'name' in data:
        post.name = data['name']
    if 'description' in data:
        post.description = data['description']

    db.session.commit()
    return post_schema.jsonify(post)
