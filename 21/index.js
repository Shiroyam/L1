function calculateCallStackSize() {
  let callCount = 0;

  function callFunction() {
    callCount++;
    callFunction()
  }

  try {
   callFunction()
  } catch (error) {
   console.log(error)
   console.log(`${callCount} раз`)
  }
}

calculateCallStackSize();

// Goggle - 13935 вызовов   
// Opera - 13935 вызовов
// Firefox - 31241 вызовов
