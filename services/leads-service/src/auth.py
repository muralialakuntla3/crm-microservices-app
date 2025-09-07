from fastapi import Depends, HTTPException, status, Request
from jose import jwt, JWTError
import os


JWT_SECRET = os.getenv('JWT_SECRET')
JWT_ALGO = os.getenv('JWT_ALGORITHM', 'HS256')


async def get_current_user(request: Request):
    auth: str = request.headers.get('Authorization') or ''
    if not auth.startswith('Bearer '):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Missing token')
    token = auth.split(' ', 1)[1]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGO])
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Token invalid')
    # payload expected to have 'sub' and 'role'
    return {'id': payload.get('sub'), 'role': payload.get('role')}


async def require_role(role: str):
    async def _inner(user=Depends(get_current_user)):
        if user.get('role') != role:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Forbidden')
        return user
    return _inner