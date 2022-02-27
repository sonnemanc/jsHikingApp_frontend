
window.addEventListener('DOMContentLoaded', function() {
const dots = document.querySelectorAll('.dot');
for(let dot1 of dots) {
    dot1.addEventListener('click', function() {
        console.log('I was clicked!');
      });
}

})


console.log('You are in the console!')