from django.urls import path
from django.conf import settings
from . import views
from django.conf.urls.static import static

app_name = 'product'
"""Api endpoints"""
urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='create'),#checked
    path('token/', views.CreateTokenView.as_view(), name='token'),#checked
    path('me/', views.ManageUserView.as_view(), name='me'),#checked
    path('food_list/', views.Food_list, name='food_list'),#checked
    path('order_list/', views.Order_list, name='order_list'),#checked
    path('addfood/', views.Add_food, name='add_food'),#checked
    path('purchase/<slug:slug>/',views.Purchase,name='purchase')
]
