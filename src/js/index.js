import '../scss/style.scss';
import Vue from '../../node_modules/vue/dist/vue.js'; 
import converterLogo from '../img/Cogwheel.jpg';




Vue.component('button-count', {
    data: function() {
            return {
                count: 0
            }
        },
    template: '<button class="btn btn-success">Обновить</button>'
})

const app = new Vue ({
    el: '#converter',
    data: {
        title: 'Exchange Rate Calculator',
        image: converterLogo,
        currencies: {},
        selectCurrency: 'USD',
        selectCurrencyTwo: 'RUB',
        value: 1,


    },

    created: function() {

         
      },
    mounted() {
        if (sessionStorage.getItem('currencies')) {
            try{
                this.currencies = JSON.parse(sessionStorage.getItem('currencies'));
            } catch(e) {
                console.log(e);
                
                sessionStorage.removeItem('currencies')
            }
            
        } else {
            var vm = this;

            fetch("https://v6.exchangerate-api.com/v6/aee6b874c5cfa194f91e2bdd/latest/USD")
            .then(function(response) {
                return response.json();
              }).then( function(data) {
                    vm.currencies = data.conversion_rates;
                    sessionStorage.setItem('currencies', JSON.stringify( data.conversion_rates));
            });
        }
      },
    computed: {
        converter: function() {
            let result =  this.currencies[this.selectCurrencyTwo] / this.currencies[this.selectCurrency]
            if (result > 1) {
                return Math.round(result* 100) /100
            } else if (result > 0.000001) {
                return Math.round(result * 1000000) / 1000000
            }
            return result
        } 
    },
    methods: {        
        swap: function(input, target, currency, currencyTwo) {
            const $target = document.querySelector(target);
            let result =  this.currencies[currency] / this.currencies[currencyTwo]
            result = +input.value * result;
            $target.value = result.toFixed(2);

    },

        getCurrency: function(currency) {
                       
            return this.currencies[currency]
        },

    }
})
