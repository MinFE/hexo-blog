

(function(win) {
    function SearchPage() {
        this.config = {
            minScore: 1e-5,
            minNum: 3 
        },
        this.init();
    }

    SearchPage.prototype = {
        init: function() {
            this.container = document.getElementById('mb-main-content');
            this.postContainer = this.container.querySelector('.md-posts');
            this.wrapContainer = this.container.querySelector('.mb-search-wrap');
            this.loading = this.container.querySelector('.mb-search-loading');
            this.tpl = '<article class="mb-posts__item" itemscope itemtype="http://schema.org/Article"><a href="{{ url }}" title="{{ title }}" itemprop="url"><div class="mb-post__cover" itemscope itemtype="http://schema.org/ImageObject"><img src="{{ cover }}" alt="{{ title }}" itemprop="contentUrl"></div><div class="mb-post__info"><h3 class="mb-post__title" itemprop="name headline">{{ title }}</h3><p class="mb-post__desc" itemprop="about">{{ desc }}</p><p class="mb-post__create-time" itemprop="dateCreated">{{ date }}</p></div></a></article>';
            this.queryString = decodeURIComponent(location.search.split('=')[1]);
            this.getData();
        },

        getData: function() {
            var self = this;

            axios
                .get('/assets/lunr/all.json')
                .then(function(res) { return res.data; })
                .then(function(data) { self.initSearch(data); });
        },

        initSearch: function(data) {
            this.index = lunr.Index.load(data.index);
            this.sourceData = data.store;
            this.result = this.index.search(this.queryString);
            this.filteredData = this.filterSourceData();
            this.render();
        },

        compileTemplate: function(tpl, data) {
            var 
                keyArr = tpl.match(/\{\{\s(\S+)\s\}\}/g),
                keys = [],
                result = '';

            function compile(item) {
                var rs = tpl;

                for(var i = 0 ; i < keyArr.length; i++) {
                    rs = rs.replace(/\{\{\s(\S+)\s\}\}/, item[keys[i]]);
                }

                result = rs + result;
            }

            for(var j = 0; j < keyArr.length; j++) {
                keys.push(keyArr[j].replace(/\{\{\s(\S+)\s\}\}/, '$1'));
            }

            if (Object.prototype.toString.apply(data) === '[object Array]') {
                data.forEach(function(item) { compile(item) });
            } else {
                compile(data);
            }

            return result;
        }, 

        render: function() {
            var filteredData = this.filteredData;

            if (!filteredData.length) {
                console.log(this.queryString)
                this.container.innerHTML = "抱歉，您要的内容似乎没有哦，不如换个关键字试试吧。";
            } else {
                this.postContainer.innerHTML = this.compileTemplate(this.tpl, this.filteredData);
                this.postContainer.classList.remove('js-hidden');
                this.wrapContainer.innerHTML = this.compileTemplate('找到匹配<em>{{ query }}</em>的结果<em>{{ num }}</em>条:', {
                    query: this.queryString,
                    num: this.filteredData.length
                });
                this.wrapContainer.classList.remove('js-hidden');
            }
            
            this.loading.classList.add('js-hidden');
        },

        filterSourceData: function() {
            var self = this,
                filteredData = [],
                minNum = self.config.minNum;
                
            this.result.forEach(function(row, idx){
                if (self.config.minScore > row.score && idx >= self.config.minScore.minNum) {
                    return;
                }
                filteredData.push(self.sourceData[row.ref])
            });
            return filteredData;
        }
    }

    new SearchPage();
})(window);