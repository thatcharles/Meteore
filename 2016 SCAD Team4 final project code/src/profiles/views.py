from django.shortcuts import render
from django.http import HttpResponse,Http404
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.models import User

from .models import Profile
from .models import Membership
from posts.models import Post
import random
# Create your views here.

def user_create(user_id,user_name):
	
	user = User.objects.create_user(username=user_id,password='glassonion')
	user.save()
	user.profile.nickname = user_name
	user.profile.level = 0
	
	user.profile.save()
	return user

def user_append(request,user_id=None):
	if(request.POST):
		user = User.objects.get(pk=user_id)
		user.profile.starName = request.POST['form_planet_name']
		user.profile.is_new = 0
		user.profile.starColor = request.POST['planet_color']
		user.profile.position_x = random.uniform(-1, 1) * 8000
		user.profile.position_y = random.uniform(-1, 1) * 6000
		user.profile.mass = 1000
		user.profile.number_of_planets = 0
		user.profile.level = 0
		user.profile.save()
		user.save()
		return redirect(request.META.get('HTTP_REFERER'))
	

def update_profile(request, id=None):
	user = User.objects.get(pk=id)
	#user.profile.nickname = ''
	user.profile.save()
	user2 = User.objects.get(pk=id)
	return HttpResponse(user2.profile.nickname) 

def user_detail(request, id=None):
	user = User.objects.get(pk=id)
	return HttpResponse(user.profile.level)
	user.save()

def user_personal(request, id=None):
	user = User.objects.get(id=id)
	queryset_list = Post.objects.filter(user=request.user)
	queryset_list3 = request.user.post_attendant.all()
	queryset_list4 = Membership.objects.filter(user=request.user) #user contributions
	context = {
		"user":user,
		"uesr_owned_missions":queryset_list,
        "user_attended_list":queryset_list3, 
        "user_contributions":queryset_list4
	}

	return render(request,"personalPage.html",context) 

def attended_mission_update(request,id=None):
	
	post = Post.objects.get(id=id)
	post.save()


	if (post.attendant.filter(username=request.user)):
		post.attendant.remove(request.user)
		post.save()
		m = Membership.objects.filter(user=request.user,post=post).delete()
	else:
		post.attendant.add(request.user)
		post.save()
		m = Membership(user=request.user, post=post,contribute=0)
		m.save()
		#m1 = Membership(user=request.user,post=post,contribution=0)
		#mi.save()
	#user_missions = request.user.objects.all()
	
	#print(user_missions
	attendant = post.attendant.all()

	posts = request.user.post_attendant.all()
	for thispost in posts:
		print(thispost.title)

	


	return redirect(request.META.get('HTTP_REFERER'))

def mission_like(request,id=None):
	
	post = Post.objects.get(id=id)
	post.save()
	post.likes+=1
	post.save()

	return redirect(request.META.get('HTTP_REFERER'))

def mission_progress(request,id=None):
	
	post = Post.objects.get(id=id)
	post.progress+=1
	post.save()
	if(post.progress == post.goal):
		post.is_active = False
		post.save()
		owner = request.user
		owner.profile.mass+=1000
		owner.profile.level+=1
		owner.save()
		owner.profile.save()
		attendant = post.attendant.all()
		for user in attendant:
			print('user.profile.mass')
			user.profile.mass+=1000
			user.profile.level+=1
			user.save()
			user.profile.save()
			
			
	m = Membership.objects.get(user=request.user,post=post)
	m.contribute+=1
	m.save()
	print(m.contribute)
	

	return redirect(request.META.get('HTTP_REFERER'))


def create_planet(request):
	
	user = request.user
	user.profile.number_of_planets+=1
	user.profile.mass-=1000
	user.save()
	user.profile.save()

	return redirect(request.META.get('HTTP_REFERER'))

	