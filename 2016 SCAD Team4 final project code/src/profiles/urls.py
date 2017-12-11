from django.conf.urls import url
from django.contrib import admin

from .views import (
	user_detail,
	user_append,
	update_profile,
	user_personal,
	attended_mission_update,
	mission_progress,
	mission_like,
	create_planet,
	)


urlpatterns = [
	url(r'^(?P<user_id>\d+)/append/$', user_append, name='append'),
	url(r'^(?P<id>\d+)/detail/$', user_detail, name='list'),
	url(r'^(?P<id>\d+)/edit/$', update_profile, name='update'),
	url(r'^(?P<id>\d+)/personal/$', user_personal, name='personal'),
	url(r'^add_attended/(?P<id>\d+)/$',attended_mission_update, name='add_attended'),
	url(r'^mission_like/(?P<id>\d+)/$',mission_like, name='mission_like'),
	url(r'^mission_progress/(?P<id>\d+)/$',mission_progress, name='mission_progress'),
	url(r'^create_planet/$', create_planet, name='create_planet'),
    #url(r'^index/$',post_mockIndex,name='index'),
]