from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from user import serializers
from user.permissions import IsTargetUser

class UserCreateView(generics.CreateAPIView):
    permission_classes = []
    serializer_class = serializers.UserCreateSerializer

class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated, IsTargetUser]
    serializer_class = serializers.UserUpdateSerializer

class UserListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.UserUpdateSerializer

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

class UserChangePasswordView(generics.UpdateAPIView):
    serializer_class = serializers.UserChangePasswordSerializer
    permission_classes = [IsAuthenticated, IsTargetUser]

    def get_object(self, queryset=None):
        return self.request.user

    def put(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            if not self.object.check_password(serializer.data.get('old_password')):
                return Response({'old_password': ['Wrong password']}, status=status.HTTP_400_BAD_REQUEST)
            self.object.set_password(serializer.data.get('new_password'))
            self.object.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



