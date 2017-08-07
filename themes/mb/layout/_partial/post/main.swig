<main class="md-main">
	<section class="md-main__content">
		<article class="post">
			<div class="post__cover">
				<img src="{{ post.cover|default(config.default_cover) }}" alt="{{ post.title }}">
			</div>

			<header class="post__header">
				<h1 class="post__title">{{ titlecase(post.title) }}</h1>
				<ul class="post__tags clearfix">
					{{ mb_post_tags(post.tags) }}
				</ul>
				<div class="post__meta">
					<span>{{ date(post.date) }}</span>
					by
					<a href="{{ post.author.github|default(config.github) }}" alt="{{ post.author.nick|default(config.author) }}" target="_blank">{{ post.author.nick|default(config.author) }}</a>
				</div>
			</header>
			
			{{ page.content }}

			{% if post.coeditor %}
			<div class="post-announce">
				感谢您的阅读，本文由
				<a href="{{ post.coeditor.url }}">{{ post.coeditor.name }}</a> 原创提供。如若转载，请注明出处：{{ post.coeditor.name }}（<a href="{{ post.coeditor.url }}">{{ post.coeditor.url }}</a>）
			</div> 
			{% else %}
			<div class="post-announce">
				感谢您的阅读，本文由
				<a href="http://blog.minfive.com/">MINFIVE BLOG</a>
				版权所有。如若转载，请注明出处：MINFIVE BLOG（<a href="http://blog.minfive.com{{ url_for(post.path) }}">http://blog.minfive.com{{ url_for(post.path) }}</a>）
			</div>

			<div class="post__prevs">
				<div class="post__prev">
					{% if post.next %}
					<a href="{{ url_for(post.next.path) }}" title="{{ post.next.title }}"><i class="iconfont icon-prev"></i>{{ post.next.title }}</a>
					{% endif %}
				</div>
				<div class="post__prev post__prev--right">
					{% if post.prev %}
					<a href="{{ url_for(post.prev.path) }}" title="{{ post.prev.title }}">{{ post.prev.title }}<i class="iconfont icon-next"></i></a>
					{% endif %}
				</div>
			</div>
		</article>

		<!-- 评论区 -->
		{% include '../common/comment.swig' %}
	</section>

	<aside class="md-main__sidebar">
		{% include '../common/sidebar.swig' %}
	</aside>
</main>