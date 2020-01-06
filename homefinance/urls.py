from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import routers
from accounting import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'transactions', views.TransactionViewSet, 'Transaction')
router.register(r'accounts', views.AccountViewSet)
router.register(r'currencies', views.CurrencyViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'subcategories', views.SubcategoryViewSet)
router.register(r'places', views.PlaceViewSet)

urlpatterns = [
    path('users/', include('user.urls')),
    path('journal/', views.AccountJournalListView.as_view()),
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
]

urlpatterns += [re_path(r'^.*', include('run.urls'))]
