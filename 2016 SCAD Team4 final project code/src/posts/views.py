from django.contrib import messages
from django.http import HttpResponse,Http404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render, get_object_or_404, redirect

from .forms import PostForm
from .models import Post
from django.contrib.auth.models import User
from profiles.models import Membership


# Create your views here.

def post_create(request):
	
	instance = Post(user=request.user,title=request.POST['form_title'],content=request.POST['form_detail']
		,kind=request.POST['form_kind'],private=request.POST['form_private'],totalmembers=request.POST['form_totalmembers'],
		goal=request.POST['form_goal'])
	
	instance.save()


	m = Membership(user=request.user, post=instance,contribute=0)
	m.save()
	#instance.attendant.add(user1)
	#instance.attendant.add(user2)
	
	
	messages.success(request, instance.attendant.all())
	return redirect(request.META.get('HTTP_REFERER'))
	#return redirect(instance.get_absolute_url())
	#context = {
	#	"form": form,
	#}
	#return render(request,"post_form.html",context)

def post_detail(request, id=None): #retrieve
	#return HttpResponse("<h1>Detail</h1>")
	instance = get_object_or_404(Post,id=id)
	context = {
		"instance": instance,
		"title": instance.title,
		"attendant": instance.attendant.all()
	}
	return render(request,"post_detail.html",context)

def post_list(request): 
	queryset_list = Post.objects.all()
	paginator = Paginator(queryset_list, 10) # Show 25 contacts per page
	page_request_var = "page"
	page = request.GET.get(page_request_var)
	try:
		queryset = paginator.page(page)
	except PageNotAnInteger:
		# If page is not an integer, deliver first page.
		queryset = paginator.page(1)
	except EmptyPage:
		# If page is out of range (e.g. 9999), deliver last page of results.
		queryset = paginator.page(paginator.num_pages)


	context = {
		"obj_set": queryset, 
		"title": "List",
		"page_request_var": page_request_var
	}
	return render(request,"post_list.html",context)

def post_update(request, id=None):
	
	instance = get_object_or_404(Post,id=id)
	form = PostForm(request.POST or None, instance=instance)
	if form.is_valid():
		instance = form.save(commit=False)
		instance.save()
		#return HttpResponseRedirect(instance.get_absolute_url())
		messages.success(request, "<a href='#'>Item</a> Saved", extra_tags='html_safe')
		return redirect(instance.get_absolute_url())
	context = {
		"instance": instance,
		"title": instance.title,
		"form": form,
	}
	return render(request,"post_form.html",context)

def post_delete(request, id=None):
	
	instance = get_object_or_404(Post,id=id)
	instance.delete()
	messages.success(request, "Successfully deleted")
	return redirect("posts:list")

