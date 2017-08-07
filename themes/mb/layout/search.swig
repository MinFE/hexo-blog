{% extends '_layout.swig' %}

{% block pageCss %}
    {{ css('sass/views/pages/search/index') }}
{% endblock %}

{% block main %}
    {% include './_partial/common/banner.swig' %}
    {% include './_partial/search/main.swig' %}
{% endblock %}

{% block pagejs %}
    {{ js('js/libs/axios.min.js') }}
    {{ js('js/libs/lunr.min.js') }}
    {{ js('js/search.js') }}
{% endblock %}