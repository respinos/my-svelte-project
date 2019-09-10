import App from './App.svelte';
import UniversalHeader from './universal-header.svelte';
import {GlobalStyleSheet} from './shared/styles';

let apps = [];
var targets = document.querySelectorAll('[data-component]');
for(var i = 0; i < targets.length; i++) {
  var app = new App({
    target: targets[i],
    props: {
      name: `world ${i + 1}`
    }
  });
  apps.push(app)
}

var header = document.querySelector('header[data-use="universal-header"]');
apps.push(new UniversalHeader({
  target: header
}))

// const app = new App({
// 	target: document.body,
// 	props: {
// 		name: 'world'
// 	}
// });

GlobalStyleSheet();

export default apps;