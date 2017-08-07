window.onload = function() {
    function getBaseType(target) {
        return Object.prototype.toString.apply(target).slice(8, -1);
    }

    function eachObj(obj, fn) {
        for(var key in obj) {
            fn(obj[key], key, obj);
        }
    }

    function getKeys(obj, sort) {
        var keys = [];

        eachObj(obj, function(value, key) {
            keys.push(key);
        });

        return keys.sort(sort);
    }

    function extend(obj, target) {
        eachObj(target, function(value, key) {
            obj[key] = value;
        });

        return obj;
    }

    // 功能函数
    (function(win) {
        function Pack(ele) {
            this.ele = ele;
            this.record = [];
            this.index = 0;
            this.dir = 1;
            this.status = false;
        }

        Pack.prototype = {
            _toggleClass: function(className, next) {
                this.ele.classList.toggle(className);

                next && setTimeout(next);
            },

            _transfromClass: function(className, next) {
                var self = this;

                this.ele.addEventListener('transitionend', function fun() {
                    next();

                    self.ele.removeEventListener('transitionend', fun);
                })

                this._toggleClass(className);
            },

            _toggle: function() {
                var opt = this.record[this.index];

                if (this.index === this.record.length || this.index === -1) {
                    this.end && this.end();
                    this.index = this.dir > 0 ? this.index - 1 : 0;
                    this.dir *= -1;
                    this.status = false;
                    return;
                }

                switch(opt.type) {
                    case 'class':
                        this._toggleClass(opt.className, this._toggle.bind(this));
                        break;
                    case 'transfrom':
                        this._transfromClass(opt.className, this._toggle.bind(this));
                        break;
                }

                this.index += this.dir;
            },

            base: function(className) {
                this.record.push({
                    className: className || 'js-open',
                    type: 'class'
                });

                return this;
            },

            transfrom: function(className) {
                this.record.push({
                    className: className,
                    type: 'transfrom'
                });

                return this;
            },

            toggle: function() {
                if (this.status) return;
                this.status = true;

                this.index === 0 || this.index === this.record.length && (this.status = true);

                this._toggle();
            },

            end: function(fun) {
                this.end = fun;
            }
        }

        win.Pack = Pack;
    })(window);

    // 动画函数
    (function(win) {
        // 匀速运动
        function linear(option) {
            var
                time = option.time,
                now = option.now,
                aims = option.aims,
                spendTime = option.spendTime;

            var next = now + (aims - now) * 60 / (time - spendTime);

            return aims - now > 0 
                ? next >= aims ? aims : next
                : next <= aims ? aims : next;
        }

        function Amt() {
            this.record = [];
            this.timeoutMap = {};
            this.listeners = {
                start: [],
                frame: [],
                end: []
            };
            this.frames = 0;
            
            this._init();
        }

        Amt.prototype = {
            _init: function() {
                this.index = 0;
                this.nowIndex = 0;
                this.timer = null;
                this.time = 0;
                this.startTime = null;
                this.record.forEach(function(point) {
                    eachObj(point, function(value, key) {
                        if (~key.indexOf('_')) return;

                        point[key].now = point[key].from;
                    });
                });

                return this;
            },
            // 获取当前周期已消耗的时间
            _getSpendTime: function() {
                var 
                    otherPointSpendTime,
                    time = this.time,
                    nowIndex = this.nowIndex;

                otherPointSpendTime = this.record.reduce(function(p, n, idx) {
                    if (idx < nowIndex) {
                        p += n['_time'];
                    }

                    return p;
                }, 0);

                return time - otherPointSpendTime;
            },
            // 启动逐帧渲染器
            _request: function(fun) {
                var requestAnimationFrame = window.requestAnimationFrame 
                    || window.mozRequestAnimationFrame 
                    || window.webkitRequestAnimationFrame 
                    || window.msRequestAnimationFrame;

                this.timer = requestAnimationFrame(fun);
                return this;
            },
            // 关闭逐帧渲染器
            _cancel: function() {
                var cancelAnimationFrame = window.cancelAnimationFrame 
                    || window.mozCancelAnimationFrame 
                    || window.webkitCancelAnimationFrame 
                    || window.msCancelAnimationFrame;

                cancelAnimationFrame(this.timer);
                return this;
            },
            // 缓动算法
            _algorithm: function(option) {
                var
                    type = option.type || 'linear',
                    time = option.time || 1000,
                    now = option.now,
                    aims = option.aims || 0,
                    spendTime = option.spendTime || 0;

                switch(type) {
                    case 'linear':
                        return linear({
                            time: time,
                            now: now,
                            aims: aims,
                            spendTime: spendTime
                        });
                }
            },
            // 触发事件
            _emit: function(event, option) {
                this.listeners[event] && this.listeners[event].forEach(function(handler) {
                    handler(option);
                });

                return this;
            },
            // 事件
            on: function(event, handler) {
                if (~getKeys(this.listeners).indexOf(event) && handler) {
                    this.listeners[event].push(handler);
                }

                return this;
            },
            // 起始点
            from: function(option) {
                option = option || {};
                var point = this.record[this.index] || {};

                eachObj(option, function(value, key) {
                    point[key] = {
                        from: value,
                        now: value,
                        to: 0
                    };
                });

                this.record[this.index] = point;

                return this;
            },
            // 目标点
            to: function(option) {
                option = option || {};
                var point = this.record[this.index] || {};

                eachObj(option, function(value, key) {
                    point[key] = extend(point[key] || {
                        from: 0,
                        now: 0
                    }, {
                        to: value
                    });
                });

                this.record[this.index] = point;

                return this;
            },
            // 变换规律
            transition: function(option) {
                var 
                    type,
                    time;

                if (typeof option === 'string') {
                    time = option;
                } else {
                    type = option.type || 'linear';
                    time = option.time || 1000;
                }

                var point = this.record[this.index] || {};

                extend(point, {
                    '_time': time,
                    '_type': type
                });

                this.record[this.index] = point;

                return this;
            },
            // 进入下一个变换周期
            next: function() {
                this.index = this.record.length;
                return this;
            },
            // 等待
            timeout: function(time) {
                if (time && typeof time === 'number') {
                    var index = this.record.length === 0 ? -1 : this.index;
                    this.timeoutMap[index] = this.timeoutMap[index] != null
                        ? this.timeoutMap[index] + time
                        : time;
                }

                return this;
            },
            // 启动动画
            start: function() {
                var 
                    record = this.record,
                    self = this;

                return this
                    .next()
                    ._emit('start')
                    ._request(function render() {
                        var 
                            point = record[self.nowIndex],
                            result = {};

                        if (!self.startTime && self.timeoutMap['-1']) {
                            self.startTime = (new Date()).getTime();
                            self.pause();
                            setTimeout(function() {
                                self._request(render);
                            }, self.timeoutMap['-1']);

                            return;
                        }

                        if (self.time === point['_time']) {
                            var timeout = self.timeoutMap[self.nowIndex];
                            
                            self.time = 0;
                            self.nowIndex++;
                            if (timeout) {
                                self.pause();
                                setTimeout(function() {
                                    self._request(render)
                                }, timeout);
                                return;
                            }
                            
                            point = record[self.nowIndex];
                        }

                        if (self.nowIndex === record.length) {
                            self._emit('end').close();
                            return;
                        }

                        eachObj(point, function(item, key) {
                            if (~key.indexOf('_')) return;

                            var nextValue = self._algorithm({
                                type: point['_type'],
                                time: point['_time'],
                                now: item['now'],
                                aims: item['to'],
                                spendTime: self.time
                            });

                            result[key] = nextValue;
                            point[key].now = nextValue;

                            if (nextValue === item['to']) {
                                self.time = point['_time'];
                            }
                        });

                        if (self.time != point['_time']) {
                            self.time += 60;
                        }

                        self._emit('frame', result);
                        self.frames++;
                        self._request(render);
                    });
            },
            // 暂停
            pause: function() {
                return this._cancel();
            },
            // 关闭动画
            close: function() {
                return this._cancel()._init();
            }
        }

        win.Amt = Amt;
    })(window);

    function toggle(ele, className, next) {
        if (typeof className === 'function') {
            next = className;
            className = null;
        }

        className = className || 'js-open';

        function fun(ele, next) {
            ele.classList.toggle(className);
            next && setTimeout(function() {
                next(ele);
            });
        }

        if (getBaseType(ele) === 'Array') {
            ele.forEach(function(item) {
                fun(item, next);
            })
        } else {
            fun(ele, next);
        }
    }

    // 搜索输入表单
    (function() {
        var TRIGGER = 'mb-search-trigger',
            FORM = 'mb-search-from';

        var triggerEle = document.getElementById(TRIGGER),
            formEle = document.getElementById(FORM);

        triggerEle.addEventListener('click', function() {
            toggle(
                [
                    triggerEle,
                    formEle
                ],
                'js-visiabled'
            )
        });
    })();

    // 菜单
    (function() {
        var 
            btn = document.getElementById('mb-menu-trigger'),
            menu = document.getElementById('mb-menu');

        var packMenu = new Pack(menu);

        packMenu.base().transfrom('js-height');

        btn.addEventListener('click', function() {
            packMenu.toggle();
        });
    })();

    // 回到顶部
    (function() {
        var backTopEle = document.getElementById('back-top');

        function toggleBackTop() {
            var 
                scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop,
                clientHeight = document.documentElement.clientHeight;

            backTopEle.classList[scrollTop > clientHeight ? 'remove' : 'add']('js-hidden');
        }

        toggleBackTop();
        document.addEventListener('scroll', toggleBackTop);

        backTopEle.addEventListener('click', function() {
            var backTopAmt = new Amt();

            backTopAmt
                .from({
                    top: window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
                })
                .to({
                    top: 0
                })
                .transition(1000)
                .on('frame', function(data) {
                    window.scrollTo(0, data.top);
                })
                .start();
        });
    })();
};