<!-- gitment -->
{% if page.comments && config.gitment %}
	<div id="container"></div>
	<!-- <link rel="stylesheet" href="https://imsun.github.io/gitment/style/default.css"> -->
	<!-- <script src="https://imsun.github.io/gitment/dist/gitment.browser.js"></script> -->
	{{ css('http://oo12ugek5.bkt.clouddn.com/blog/gitment.default.min.css') }}
	{{ js('http://oo12ugek5.bkt.clouddn.com/blog/gitment.min.js') }}
	<script>
		const myTheme = {
		  	render(state, instance) {
		    	const container = document.createElement('div')
		    	container.lang = "en-US"
		    	container.className = 'gitment-container gitment-root-container'
		    	container.appendChild(instance.renderHeader(state, instance))
		    	container.appendChild(instance.renderEditor(state, instance))
		    	container.appendChild(instance.renderComments(state, instance))
		    	container.appendChild(instance.renderFooter(state, instance))
		    	return container
		  	},
		};

		var tags = [{% for tag in page.tags %}'{{ tag.name }}', {% endfor %}];

		var gitment = new Gitment({
		  	theme: myTheme,
		  	owner: '{{ config.gitment.owner }}',
		  	repo: '{{ config.gitment.repo }}',
		  	oauth: {
		    	client_id: '{{ config.gitment.id }}',
		    	client_secret: '{{ config.gitment.secret }}',
		  	},
		  	labels: tags
		})

		gitment.render('container');
	</script>
{% endif %}