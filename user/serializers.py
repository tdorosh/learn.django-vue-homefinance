import re
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from rest_framework import serializers

class UserCreateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=20, validators=[UniqueValidator(queryset=User.objects.all())])
    email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(username=validated_data['username'], email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()
        return user

    def validate_password(self, value):
        validate_password(value)
        return value

    def validate_username(self, value):
        if not re.match(r'^[a-zA-Z]{3}\w{0,17}$', value):
            raise ValidationError('Username must have at least three non-digital characters.')
        return value

class UserUpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=20, validators=[UniqueValidator(queryset=User.objects.all())])
    email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        return instance
    
    def validate_username(self, value):
        if not re.match(r'^[a-zA-Z]{3}\w{0,17}$', value):
            raise ValidationError('Username must have at least three non-digital characters.')
        return value

class UserChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value