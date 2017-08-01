<article class="mb-posts__item" itemscope itemtype="http://schema.org/Article">
	<a href="{{ url_for(post.path) }}" title="{{ post.title }}" itemprop="url">
		<div class="mb-post__cover" itemscope itemtype="http://schema.org/ImageObject">
			{% if not post.cover %}
			<img src="{{ config.default_cover }}" alt="{{ post.title }}" itemprop="contentUrl">
			<p>{{ post.title }}</p>
			{% endif %}
			{% if post.cover %}
			<img src="{{ post.cover }}" alt="{{ post.title }}" itemprop="contentUrl">
			{% endif %}
		</div>

		<div class="mb-post__info">
			<h3 class="mb-post__title" itemprop="name headline">{{ post.title }}</h3>
			<p class="mb-post__desc" itemprop="about">{{ post.subtitle }}</p>
			<p class="mb-post__create-time" itemprop="dateCreated">{{ date(post.date || post.update) }}</p>
		</div>
	</a>
</article>