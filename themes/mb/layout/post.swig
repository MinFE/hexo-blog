{% extends '_layout.swig' %}

{% block pageCss %}
	{{ css('sass/views/pages/post/index') }}
{% endblock %}

{% block main %}
	{{ partial('./_partial/post/main.swig', { post:page }) }}
{% endblock %}

{% block footer %}
	{{ partial('./_partial/common/post_footer.swig') }}
{% endblock %}