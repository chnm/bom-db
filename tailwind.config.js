module.exports = {
    content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
    plugins: [
      require('tw-elements/dist/plugin')
    ],
    theme: {   
      extend: {     
        colors: {
          dbn: {
            green: '#3E3E32',
            yellow: '#B1A569',
            yellowdark: '#7D744A',
            blue: '##96ADC8',
            red: '#EF3054',
            orange: '#c75000ff',
            purple: '#7F5A83'
          }
        }
      }
    }
  }