from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from .models import Post, Comment
from .forms import PostForm, CommentForm
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required


# Create your views here.
def post_list(request):
    """
    published blog posts sorted by published date

    """
    posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
    context = {'posts': posts}
    return render(request, 'blog/post_list.html', context)


def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    context = {'post': post}
    return render(request, 'blog/post_detail.html', context)


@login_required
def post_new(request):
    """
    creates new blog post

    """
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            # post.published_date = timezone.now()
            post.save()
            return redirect('post_detail', pk=post.pk)
    else:
        form = PostForm()
    context = {'form': form}
    return render(request, 'blog/post_edit.html', context)


@login_required
def post_edit(request, pk):
    """
    edit blog post

    """
    post = get_object_or_404(Post, pk=pk)
    if request.method == 'POST':
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            # post.published_date = timezone.now()
            post.save()
            return redirect('post_detail', pk=post.pk)
    else:
        form = PostForm(instance=post)
    context = {'form': form}
    return render(request, 'blog/post_edit.html', context)


@login_required
def post_draft_list(request):
    """
    unpublished blog posts

    """
    posts = Post.objects.filter(published_date__isnull=True).order_by('created_date')
    context = {'posts': posts}
    return render(request, 'blog/post_draft_list.html', context)


def post_publish(request, pk):
    """
    publishes unpublished post

    """
    post = get_object_or_404(Post, pk=pk)
    post.publish()
    return redirect('post_list')


@login_required
def post_remove(request, pk):
    """
    removes post both published and unpublished

    """
    post = get_object_or_404(Post, pk=pk)
    post.delete()
    return redirect('post_list')


def add_comment_to_post(request, pk):
    """
    add comment to a published post

    """
    post = get_object_or_404(Post, pk=pk)
    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.post = post
            comment.save()
            return redirect('post_detail', pk=post.pk)
    else:
        form = CommentForm
    context = {'form': form}
    return render(request, 'blog/add_comment_to_post.html', context)


@login_required
def comment_approve(request, pk):
    """
    approves comment to be viewed by public

    """
    comment = get_object_or_404(Comment, pk=pk)
    comment.approve()
    return redirect('post_detail', pk=comment.post.pk)


@login_required
def comment_remove(request, pk):
    """
    disapproves comment and removes it

    """
    comment = get_object_or_404(Comment, pk=pk)
    comment.delete()
    return redirect('post_detail', pk=comment.post.pk)