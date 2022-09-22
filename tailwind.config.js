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
            blue: '#9ed0e6ff',
            red: '#b95f89ff',
            orange: '#c75000ff'
          }
        }
      }
    }
  }