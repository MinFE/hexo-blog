{% extends '_layout.swig' %}

{% block pageCss %}
	{{ css('sass/views/pages/index/index') }}
{% endblock %}

{% block main %}
	{% if page.current == 1 %}
		{% include './_partial/common/banner.swig' %}
	{% endif %}
	{% include './_partial/index/main.swig' %}
{% endblock %}