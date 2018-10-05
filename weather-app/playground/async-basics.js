console.log('Starting App')

setTimeout(() => {
  console.log('Callback');
}, 2000);

setTimeout(() => {
  console.log('Second Callback');
}, 0);

console.log('Finishing Up');
