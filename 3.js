function MathX() {
  // O(n)
  const fibonacci = function (n) {
    if (n <= 0) {
      return null
    };

    const fib = [0, 1];

    for (let i = 2; i <= n; i++) {
      const num = fib[i - 1] + fib[i - 2];
      fib.push(num);
    }

    return fib[n];
  };

  // O(n)
  const fibonacciSeries = function (n) {
    if (n <= 0) {
      return []
    };

    const fib = [0, 1];

    for (let i = 2; i <= n; i++) {
      const num = fib[i - 1] + fib[i - 2];
      fib.push(num);
    }

    return fib;
  };

  // O(sqrt(n))
  const isPrime = function (n) {
    if (n <= 1) {
      return false
    };

    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        return false
      };
    }

    return true;
  };

  //O(n * sqrt(n))
  const primeNumbers = function (n) {
    if (n <= 0){
      return []
    };

    const prime = [];

    for (let i = 2; i <= n; i++) {
      if (isPrime(i)) {
        prime.push(i)
      };
    }

    return prime;
  };

  return {
    fibonacci: fibonacci,
    fibonacciSeries: fibonacciSeries,
    isPrime: isPrime,
    primeNumbers: primeNumbers,
  };
}

const mathX = new MathX();
console.log(mathX.fibonacci(7));
console.log(mathX.fibonacciSeries(7));
console.log(mathX.isPrime(7));
console.log(mathX.primeNumbers(7));

const mathX2 = new MathX()
console.log(mathX2.fibonacci(6));
console.log(mathX2.fibonacciSeries(6));
console.log(mathX2.isPrime(6));
console.log(mathX2.primeNumbers(6));
