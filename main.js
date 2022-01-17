// global reset
import './global.style.scss';
// sass
import './src/scss/main.scss';

// javascript
import './src/js/calculator';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
} else {
  console.log('Production mode');
}
