<main class="md-main about-page">
    {{ page.content }}

    <h2>联系方式</h2>

    <div class="about__contact-box">
        <ul class="about__contact-list">
            <li class="about__contact">
                <div class="contact__box">
                    <p class="contact__title">Wechat</p>
                    <img class="about__qrcode-img" src="{{ config.qcode }}" title="Wechat">
                </div>
            </li>
            {% for item in site.data.contact %}
            <li class="about__contact">
                <a class="contact__box contact__link" href="{{ item.link }}" title="{{ titlecase(item.title) }}" target="_blank">
                    <p class="contact__title">{{ titlecase(item.title) }}</p>
                    <i class="iconfont {{ item.icon }} contact__icon"></i>
                    <p class="contact__name">{{ item.name }}</p>
                </a>
            </li>
            {% endfor %}
        </ul>
    </div>
</main>