<div id="md-posts" class="md-posts clearfix">
	{% for post in page.posts %}
		{% if not post.draft %}
			{% include '../post/mini.swig' with { post: post } %}
		{% endif %}
	{% endfor %}
</div>

{{ mb_paginator() }}