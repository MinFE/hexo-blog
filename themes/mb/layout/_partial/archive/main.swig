{% set mbArchives = mb_archives(page.posts) %}

<main class="md-main">
    <section class="md-main__content">
        <nav id="mb-main-nav" class="mb-main__nav">
            <ul>
                {% for archive in mbArchives %}
                    <li class="nav__item {% if archive.index == 0 %}nav__item--selected{% endif %}" data-index="{{ archive.index }}">
                        {{ archive.year }}年
                    </li>
                {% endfor %}
            </ul>
        </nav>

        {% for archive in mbArchives %}
            <div class="md-posts clearfix {% if archive.index != 0 %}js-hidden{% endif %}">
                {% for post in archive.posts %}
                    {% if not post.draft %}
                        {% include '../post/mini.swig' with { post: post } %}
                    {% endif %}
                {% endfor %}
            </div>
        {% endfor %}
    </section>

    <aside class="md-main__sidebar">
        {% include '../common/sidebar.swig' %}
    </aside>
</main>