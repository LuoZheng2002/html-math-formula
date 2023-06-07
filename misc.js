function assert(condition, message) {
    if (!condition) {
      console.error('Assertion failed:', message);
    }
}

function randomColor(){
    const color = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');
    console.log('color: ' + color);
	return color;
}