from django.contrib import messages
from django.http import HttpResponse,Http404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render, get_object_or_404, redirect
from django.core.urlresolvers import reverse

from django.contrib import auth

from profiles.models import Membership
from posts.models import Post
from django.contrib.auth.models import User
import profiles

def Index(request):
    context={}
    if(request.POST):
        username = request.POST['login_userId']
        password = 'glassonion'
    
        user = auth.authenticate(username=username, password=password)

        if user is not None and user.is_active:
            auth.login(request, user)
            context = {
                "user": user,
                "accessToken": request.POST['login_token'],
                "userId": request.POST['login_userId'], #used to be user name of Database
                "userName": request.POST['user_name'], #used to be user nickname 
                }
            queryset_list = Post.objects.all() #all missions
            user_list = User.objects.all()
            queryset_list2 = Post.objects.filter(user=request.user) #user owned missions
            queryset_list3 = request.user.post_attendant.all() #user attended missions
            queryset_list4 = Membership.objects.filter(user=request.user) #user contributions

            context["obj_set"] = queryset_list
            context["uesr_owned_missions"] = queryset_list2
            context["user_list"] = user_list
            context["user_attended_list"] = queryset_list3
            context["user_contributions"] = queryset_list4

            
            return render(request,"mainPage.html",context)
        else:
            newUser = profiles.views.user_create(request.POST['login_userId'],request.POST['user_name'])
            user = auth.authenticate(username=newUser.username, password='glassonion')
            if user is not None and user.is_active:
                auth.login(request, user)
                context = {
                    "user": user,
                    "userId": user.username, #FB id
                    "userName": user.profile.nickname, #FB name
                    }

            queryset_list = Post.objects.all() #all missions
            queryset_list2 = Post.objects.filter(user=request.user) #user owned missions
            queryset_list3 = request.user.post_attendant.all() #user attended missions
            queryset_list4 = Membership.objects.filter(user=request.user) #user contributions
            user_list = User.objects.all()
            context["obj_set"] = queryset_list
            context["uesr_owned_missions"] = queryset_list2
            context["user_list"] = user_list
            context["user_attended_list"] = queryset_list3
            context["user_contributions"] = queryset_list4
            return render(request,"mainPage.html",context)

    user = request.user
    context = {
        "user": user,
        }
    queryset_list = Post.objects.all() #all missions
    queryset_list2 = Post.objects.filter(user=request.user) #user owned missions
    queryset_list3 = request.user.post_attendant.all() #user attended missions
    queryset_list4 = Membership.objects.filter(user=request.user) #user contributions
    user_list = User.objects.all()
    context["obj_set"] = queryset_list
    context["uesr_owned_missions"] = queryset_list2
    context["user_list"] = user_list
    context["user_attended_list"] = queryset_list3
    context["user_contributions"] = queryset_list4
    print(queryset_list2)

    return render(request,"mainPage.html",context)
   
def about(request):
    #return HttpResponse('cool')
    return render(request,"about.html") 

def mission(request):
 
    #return HttpResponse('cool')
    mission_list = Post.objects.all()
    queryset_list4 = Membership.objects.filter(user=request.user) #user contributions
    context={
        "mission_list":mission_list,
        "user_contributions" :queryset_list4
    }
    return render(request,"missionsPage.html",context) 

def login(request):

    #if request.user.is_authenticated(): 
    #    return HttpResponseRedirect('/index/')
    return render(request,"loginPage.html")