from flask_marshmallow import Marshmallow
from models import Post

ma = Marshmallow()

class PostSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Post

    id = ma.auto_field()
    name = ma.auto_field()
    description = ma.auto_field()

post_schema = PostSchema()
posts_schema = PostSchema(many=True)
