from django.contrib.auth import get_user_model as User


class UserService:

    @staticmethod
    def get_user_by_email(email: str) -> User():
        try:
            user = User().objects.get(email=email)
        except User().DoesNotExist:
            return None
        return user

    @staticmethod
    def get_or_create_user(user_data: dict) -> User():
        user, created = User().objects.get_or_create(email=user_data['email'], defaults={'name': user_data['name']})
        return user
