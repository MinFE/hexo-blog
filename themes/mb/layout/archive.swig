{% extends '_layout.swig' %}

{% block pageCss %}
    {{ css('sass/views/pages/archive/index') }}
{% endblock %}

{% block main %}
    {% include './_partial/archive/main.swig' %}
{% endblock %}

{% block pagejs %}
    {{ js('js/archive.js') }}
{% endblock %}