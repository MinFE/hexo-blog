{% extends '_layout.swig' %}

{% block pageCss %}
    {{ css('sass/views/pages/about/index') }}
{% endblock %}

{% block main %}
    {% include './_partial/common/banner.swig' %}
    {% include './_partial/about/main.swig' %}
{% endblock %}