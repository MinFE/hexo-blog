<section class="md-banner">
	{% if config.logo %}
		{{ image_tag(config.logo, { alt: config.author, class: 'md-banner__logo' }) }}
	{% endif %}

	<h2 class="md-banner__title">
		{{ config.subtitle || config.title || config.author }}
	</h2>

	{% if config.subtitle_desc %}
	<p class="md-banner__desc">
		{{ config.subtitle_desc }}
	</p>
	{% endif %}
</section>