import jwt
from os import getenv
import base64
from logging import getLogger

log = getLogger(__name__)
def get_user_and_org(request):
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        return None, None
    
    token = auth.split(" ")[1]
    decoded_secret = base64.b64decode(getenv("JWT_SECRET"))
    try:
        decoded = jwt.decode(token, decoded_secret, algorithms=["HS256"])
        log.info(decoded)
        return decoded.get("user_id"), decoded.get("org_id")
    except jwt.exceptions.InvalidTokenError:
        return None, None