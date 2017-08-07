<header class="mb__header">
	<h1 class="mb-header__logo mb-header__block">
		{{ link_to('', config.title, { class: 'header-logo__text no-decoration' }) }}
	</h1>

	<nav id="mb-menu" class="mb-header__link-menu mb-header__block">
		<ul class="mb-header-link-menu__list clearfix">
			{{ header_menu('header-link-menu__item') }}
		</ul>
	</nav>

	<nav class="header__other-ment header__block">
		<ul class="header-other-ment__list clearfix">
			<li class="header-other-ment__item header-other-ment__item--search">
				<a id="mb-search-trigger" href="javascript:void(0)" title="search">
					<i class="iconfont icon-search"></i>
				</a>
				<form id="mb-search-from" class="header__search" action="/search/">
					<input class="input" type="text" name="search" placeholder="Search">
				</form>
			</li>
			<li class="header-other-ment__item header-other-ment__item--menu">
				<a id="mb-menu-trigger" href="javascript:void(0)" title="menu">
					<i class="iconfont icon-menu"></i>
				</a>
			</li>
		</ul>
	</nav>
</header>