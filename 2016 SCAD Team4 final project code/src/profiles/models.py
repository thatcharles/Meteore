from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from posts.models import Post
# Create your models here.

class Profile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	nickname = models.CharField(max_length=30, blank=True)
	level = models.IntegerField(default=0)
	mass = models.IntegerField(default=0)
	position_x = models.IntegerField(default=0)
	position_y = models.IntegerField(default=0)
	starName = models.CharField(max_length=30, blank=True, default='newSTAR')
	starColor = models.CharField(max_length=30, blank=True, default='White')
	number_of_planets = models.IntegerField(default=0)
	energy = models.IntegerField(default=0)
	is_new = models.IntegerField(default=1)

	@receiver(post_save, sender=User)
	def create_user_profile(sender, instance, created, **kwargs):
		if created:
			Profile.objects.create(user=instance)

	#@receiver(post_save, sender=User)
	#def save_user_profile(sender, instance, **kwargs):
		#instance.profile.save()
class Membership(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    post = models.ForeignKey(Post,on_delete=models.CASCADE)
    contribute = models.IntegerField(default=0)