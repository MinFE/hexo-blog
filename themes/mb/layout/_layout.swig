<!DOCTYPE html>
<html lang="zh-cn">
<head>
	<meta charset="utf-8" />
	{% block title %}
	<title>{% if page.title %}{{ page.title }} | {% endif %}{{ config.subtitle }}</title>
	{% endblock %}
	{% include './_partial/common/head.swig' %}
	
	{% block pageCss %}
	{% endblock %}
</head>
<body class="mb">
	{% block header %}
		{% include './_partial/common/header.swig' %}
	{% endblock %}

	{% block main %}
	{% endblock %}

	{% block footer %}
		{% include './_partial/common/footer.swig' %}
	{% endblock %}

	{% block backTop %}
		{% include './_partial/common/back-top.swig' %}
	{% endblock %}

	{% block pagejs %}
	{% endblock %}
</body>
</html>