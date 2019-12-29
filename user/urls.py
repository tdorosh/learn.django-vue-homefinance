from django.urls import path
from user import views

urlpatterns = [
    path('', views.UserListView.as_view()),
    path('create/', views.UserCreateView.as_view()),
    path('profile/<int:pk>/', views.UserRetrieveUpdateDestroyView.as_view()),
    path('profile/change-password/', views.UserChangePasswordView.as_view()),
]