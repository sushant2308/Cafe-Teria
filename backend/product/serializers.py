  
from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers
from .models import Food,Order


"""Serializers for converting model Data to Json"""
class FoodSerializer(serializers.ModelSerializer):

    class Meta:
        model=Food
        fields=('id','name','price','image',)


class OrderSerializer(serializers.ModelSerializer):
    food_item=FoodSerializer(read_only=True)
    class Meta:
        model=Order
        fields=('food_item','date')

class UserSerializer(serializers.ModelSerializer):
    """Serializer for the users object"""
    orders=OrderSerializer(many=True,read_only=True)
    class Meta:
        model = get_user_model()
        fields = ('id','email', 'password', 'name','phone_no','employee_id','organisation_name','id_image','orders',)
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        """Create a new user with encrypted password and return it"""
        user=get_user_model().objects.create_user(**validated_data)
        print(user)
        return user

    def update(self, instance, validated_data):
        """Update a user, setting the password correctly and return it"""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user


class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user authentication object"""
    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        """Validate and authenticate the user"""
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password
        )
        if not user:
            msg = _('Unable to authenticate with provided credentials')
            raise serializers.ValidationError(msg, code='authentication')

        attrs['user'] = user
        return attrs
