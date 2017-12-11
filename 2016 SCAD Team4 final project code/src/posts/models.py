from django.db import models
from django.core.urlresolvers import reverse
from django.conf import settings

from django.contrib.auth.models import User
# Create your models here.

class Post(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL,default=1,related_name='post_owner',on_delete=models.CASCADE)
	title = models.CharField(max_length=120)
	content = models.TextField() 
	kind = models.CharField(max_length=20,default='environment')
	private = models.CharField(max_length=20,default='public')
	totalmembers = models.IntegerField(default=0)
	goal = models.IntegerField(default=0)
	attendant = models.ManyToManyField(User,related_name='post_attendant')
	is_active = models.BooleanField(default=True)
	likes = models.IntegerField(default=0)
	progress = models.IntegerField(default=0)
	
	updated = models.DateTimeField(auto_now=True,auto_now_add=False) #每次存都更新
	timestamp = models.DateTimeField(auto_now=False,auto_now_add=True) #只有第一次存紀錄

	def __str__(self):
		return self.title

	def get_absolute_url(self):
		return reverse("posts:detail", kwargs={"id": self.id})

	class Meta:
		ordering = ["-timestamp","-updated"]


