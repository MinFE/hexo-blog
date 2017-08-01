{% extends '_layout.swig' %}

{% block pageCss %}
	{{ css('sass/views/pages/index/index') }}
{% endblock %}

{% block main %}
	<main class="md-main">
		<section class="md-main__content">
			<div id="md-posts" class="md-posts clearfix">
				{% for post in page.posts %}
					{% if not post.draft %}
						{% include './_partial/post/mini.swig' with { post: post } %}
					{% endif %}
				{% endfor %}
			</div>
			{{ mb_paginator(true) }}
		</section>

		<aside class="md-main__sidebar">
			{% include './_partial/common/sidebar.swig' %}
		</aside>
	</main>
{% endblock %}