var check = require('../check.js');
var assert = require('assert');

describe('Testa parâmetros do paciente', () => {
    it('Testa Batimentos normais', () => {
        assert.equal(check({
            batimentos: 100,
            pressao: {
                sistolica: 100,
                diastolica: 80
            }
        }).success, true);
    });

    it('Testa Batimentos baixos', () => {
        assert.equal(check({
            batimentos: 50,
            pressao: {
                sistolica: 100,
                diastolica: 80
            }
        }).success, false);
    });

    it('Testa Batimentos altos', () => {
        assert.equal(check({
            batimentos: 101,
            pressao: {
                sistolica: 100,
                diastolica: 80
            }
        }).success, false);
    });


    it('Testa Frequência normal', () => {
        assert.equal(check({
            batimentos: 90,
            pressao: {
                sistolica: 100,
                diastolica: 80
            }
        }).success, true);
    });

    it('Testa Frequência baixa', () => {
        assert.equal(check({
            batimentos: 90,
            pressao: {
                sistolica: 90,
                diastolica: 80
            }
        }).success, false);

        assert.equal(check({
            batimentos: 90,
            pressao: {
                sistolica: 100,
                diastolica: 59
            }
        }).success, false);
    });

    it('Testa Frequência alta', () => {
        assert.equal(check({
            batimentos: 90,
            pressao: {
                sistolica: 141,
                diastolica: 80
            }
        }).success, false);

        assert.equal(check({
            batimentos: 90,
            pressao: {
                sistolica: 100,
                diastolica: 91
            }
        }).success, false);
    });
});