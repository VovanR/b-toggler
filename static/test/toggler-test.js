requirejs([
    '../vendor/chai/chai',
    'jquery',
    '../js/modules/toggler',
], function (
    chai,
    $,
    Toggler
) {

    'use strict';

    mocha.setup('bdd');
    var expect = chai.expect;

    describe('Toggler', function () {
        describe('constructor', function () {
            it('should initialize', function () {
                var m = new Toggler({
                    name: 'test',
                });
                expect(m).to.not.equal(undefined);
            });

            it('should have toggler block', function () {
                var m = new Toggler({
                    name: 'test',
                });
                expect(m.bToggler[0]).to.not.equal(undefined);
            });

            it('should have panel block', function () {
                var m = new Toggler({
                    name: 'test',
                });
                expect(m.bPanel[0]).to.not.equal(undefined);
            });
        });

        describe('#_open', function () {
            it('should open panel and change toggler text to \'Hide\'', function () {
                var m = new Toggler({
                    name: 'test',
                });
                m._open();
                expect(m.bToggler.find('.b-toggler__text._name_opened').is(':visible')).to.equal(true);
                expect(m.bToggler.find('.b-toggler__text._name_closed').is(':visible')).to.equal(false);
                expect(m.bPanel.is(':visible')).to.equal(true);
            });
        });

        describe('#_close', function () {
            it('should close panel and change toggler text to \'Show\'', function () {
                var m = new Toggler({
                    name: 'test',
                });
                m._close();
                expect(m.bToggler.find('.b-toggler__text._name_opened').is(':visible')).to.equal(false);
                expect(m.bToggler.find('.b-toggler__text._name_closed').is(':visible')).to.equal(true);
                expect(m.bPanel.is(':visible')).to.equal(false);
            });
        });

        describe('#toggle', function () {
            it('should toggle panel and toggler text', function () {
                var m = new Toggler({
                    name: 'test',
                });
                m.toggle();
                expect(m.bToggler.find('.b-toggler__text._name_opened').is(':visible')).to.equal(true);
                expect(m.bToggler.find('.b-toggler__text._name_closed').is(':visible')).to.equal(false);
                expect(m.bPanel.is(':visible')).to.equal(true);
                m.toggle();
                expect(m.bToggler.find('.b-toggler__text._name_opened').is(':visible')).to.equal(false);
                expect(m.bToggler.find('.b-toggler__text._name_closed').is(':visible')).to.equal(true);
                expect(m.bPanel.is(':visible')).to.equal(false);
            });
        });
    });

    if (window.mochaPhantomJS) {
        mochaPhantomJS.run();
    } else {
        mocha.run();
    }

});
