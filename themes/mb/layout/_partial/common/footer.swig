<footer class="mb__footer">
	<p class="mb-footer__links">
		{% for item in site.data.contact %}
			<a class="mb-fooer-links__item" href="{{ item.link }}" title="{{ titlecase(item.title) }}" target="_blank">
				<i class="iconfont {{ item.icon }}"></i>
			</a>
		{% endfor %}
	</p>
	<p class="mb-footer__text">@2017-{{ date(Date.now(), 'YYYY') }} Minfive</p>
	<p class="mb-footer__text">
		Powered by <a href="http://hexo.io/" target="_blank">Hexo</a>. Theme by <a href="https://github.com/Mrminfive">mb</a>
	</p>

	{% block statistical %}
		{% include './page_statistical.swig' %}
	{% endblock %}
</footer>

{{ js(['js/index.js']) }}