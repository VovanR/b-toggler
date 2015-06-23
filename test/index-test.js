requirejs([
    'jquery',
    'chai',
    'sinon',
    'lodash',
    '../index',
], function (
    $,
    chai,
    sinon,
    _,
    Toggler
) {

    'use strict';

    mocha.setup('bdd');
    var assert = chai.assert;

    describe('Toggler', function () {
        /**
         */
        var module = function (o) {
            o = o || {};
            o.name = 'test';
            return new Toggler(o);
        };

        var _$fixtureTemplate = $('#fixture-template');
        var _fixtureTemplate = _$fixtureTemplate.html();
        _$fixtureTemplate.empty();

        beforeEach(function () {
            $('#fixtures').html(_fixtureTemplate);
        });

        afterEach(function () {
        });

        var test = {
            /**
             */
            isActive: function (m) {
                assert.ok(m._$toggler.find('.b-toggler__text._name_opened').is(':visible'));
                assert.notOk(m._$toggler.find('.b-toggler__text._name_closed').is(':visible'));
                assert.ok(m._$panel.is(':visible'));
                if (m._$dummyPanel.length) {
                    assert.notOk(m._$dummyPanel.is(':visible'));
                }
            },
            /**
             */
            isInactive: function (m) {
                assert.notOk(m._$toggler.find('.b-toggler__text._name_opened').is(':visible'));
                assert.ok(m._$toggler.find('.b-toggler__text._name_closed').is(':visible'));
                assert.notOk(m._$panel.is(':visible'));
                if (m._$dummyPanel.length) {
                    assert.ok(m._$dummyPanel.is(':visible'));
                }
            },
        };

        describe('constructor', function () {
            it('should initialize', function () {
                var m = module();
                assert.isDefined(m);
            });

            it('should have toggler block', function () {
                var m = module();
                assert.ok(m._$toggler.length);
            });

            it('should have panel block', function () {
                var m = module();
                assert.ok(m._$panel.length);
            });

            it('should have dummy panel if defined', function () {
                var m = module();
                assert.ok(m._$dummyPanel.length);
            });

            it('should throw if no options', function () {
                assert.throw(function () {
                    var m = new Toggler();
                });
            });
        });

        describe('_open', function () {
            it('should open panel and change toggler text to \'Hide\'', function () {
                var m = module();
                m._open();
                test.isActive(m);
            });
        });

        describe('_close', function () {
            it('should close panel and change toggler text to \'Show\'', function () {
                var m = module();
                m._close();
                test.isInactive(m);
            });
        });

        describe('#toggle', function () {
            it('should toggle panel and toggler text', function () {
                var m = module();
                m.toggle();
                test.isActive(m);
                m.toggle();
                test.isInactive(m);
            });
        });

        describe('#open', function () {
            it('should open panel', function () {
                var m = module();
                test.isInactive(m);
                m.open();
                test.isActive(m);
                m.open();
                test.isActive(m);
            });
        });

        describe('#close', function () {
            it('should close panel', function () {
                var m = module();
                test.isInactive(m);
                m.open();
                test.isActive(m);
                m.close();
                test.isInactive(m);
                m.close();
                test.isInactive(m);
            });
        });

        describe('ui', function () {
            describe('click on toggler text', function () {
                it('should toggle toggler', function () {
                    var m = module();
                    m._$toggler.trigger('click');
                    test.isActive(m);
                    m._$toggler.trigger('click');
                    test.isInactive(m);
                });
            });

            describe('close on blur', function () {
                it('should be `false` on default', function () {
                    var m = module();
                    assert.isFalse(m._closeOnBlur);
                });

                describe('true', function () {
                    it('should close panel on blur', function () {
                        var m = module({
                            closeOnBlur: true,
                        });
                        m.open();
                        assert.notEqual(m._$panel.css('display'), 'none');
                        $(document.body).trigger('click');
                        assert.equal(m._$panel.css('display'), 'none');
                    });

                    it('should not close panel on panel block', function () {
                        var m = module({
                            closeOnBlur: true,
                        });
                        m.open();
                        m._$panel.trigger('click');
                        assert.notEqual(m._$panel.css('display'), 'none');
                    });

                    it('should not close panel on panel children blocks', function () {
                        var m = module({
                            closeOnBlur: true,
                        });
                        m.open();
                        m._$panel.children().first().trigger('click');
                        assert.notEqual(m._$panel.css('display'), 'none');
                    });

                    it('should not close on toggler block', function () {
                        var m = module({
                            closeOnBlur: true,
                        });
                        m.open();
                        assert.notEqual(m._$panel.css('display'), 'none');
                        m._$toggler.trigger('click');
                        assert.equal(m._$panel.css('display'), 'none');
                    });

                    it('should not close on toggler children blocks', function () {
                        var m = module({
                            closeOnBlur: true,
                        });
                        assert.equal(m._$panel.css('display'), 'none');
                        var child = m._$toggler.children().first();
                        child.trigger('click');
                        assert.notEqual(m._$panel.css('display'), 'none');
                    });

                    it('should not prevent inside links', function () {
                        var $link = $('#fixtures').find('a');
                        var m = module({
                            closeOnBlur: true,
                        });
                        var ee;
                        $link.on('click', function (e) {
                            ee = e;
                        });
                        $link.trigger('click');
                        assert.isFalse(ee.isDefaultPrevented());
                    });
                });

                describe('false', function () {
                    it('should not close panel on blur', function () {
                        var m = module();
                        m.open();
                        assert.notEqual(m._$panel.css('display'), 'none');
                        $(document.body).trigger('click');
                        assert.notEqual(m._$panel.css('display'), 'none');
                    });
                });
            });
        });

        describe('callbacks', function () {
            describe('open', function () {
                it('should trigger open callback', function () {
                    var isFired = false;
                    var m = module({
                        /**
                         */
                        onOpen: function () {
                            isFired = true;
                        },
                    });
                    assert.isFalse(isFired);
                    m.open();
                    assert.isTrue(isFired);
                });
            });

            describe('close', function () {
                it('should trigger close callback', function () {
                    var isFired = false;
                    var m = module({
                        /**
                         */
                        onClose: function () {
                            isFired = true;
                        },
                    });
                    assert.isFalse(isFired);
                    m.close();
                    assert.isTrue(isFired);
                });
            });
        });
    });

    if (window.mochaPhantomJS) {
        mochaPhantomJS.run();
    } else {
        mocha.run();
    }

});
