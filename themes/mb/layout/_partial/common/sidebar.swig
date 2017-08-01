<aside class="md__aside">
	<div class="md-aside__block md__wx">
		<img class="md-wx__img" src="{{ config.qcode }}" alt="欢迎关注">
	</div>

	<div class="md-aside__block md__introduction">
		<h3 class="md-aside-block__title">{{ __('aside.introduction') }}</h3>
		<p class="md-aside-block__text">{{ config.introduction }}</p>
	</div>

	<div class="md-aside__block md__archive">
		<h3 class="md-aside-block__title">{{ __('aside.archive') }}</h3>
		<ul class="md-aside-block__list clearfix">
			{{ list_categories({ order: -1 }) }}
		</ul>
	</div>

	<div class="md-aside__block md__archive">
		<h3 class="md-aside-block__title">{{ __('aside.tag') }}</h3>
		<ul class="md-aside-block__list clearfix">
			{{ list_tags({ order: -1, amount: 20 }) }}
		</ul>
	</div>

	<div class="md-aside__block md__friend-link">
		<h3 class="md-aside-block__title">{{ __('aside.firend_link') }}</h3>
		<ul class="md-aside-block__list clearfix">
			{% for item in site.data.link %}
				<li class="md-aside-block__item">
					<a href="{{ item.link }}" target="_blank" title="{{ item.desc }}">
                        {{ item.name }}
                    </a>
				</li>
			{% endfor %}
		</ul>
	</div>
</aside>