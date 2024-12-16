<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prime Checker with FSA</title>
</head>
<body>
    <input type="number" id="numberInput" placeholder="Masukkan bilangan">
    <button id="checkButton">Cek</button>
    <p id="result"></p>

    <script>
        // Define states
        const STATES = {
            Q0: 'q0', // Start state
            Q1: 'q1', // Validate input
            Q2: 'q2', // Check prime
            Q3: 'q3'  // Show result
        };

        // Initial state
        let currentState = STATES.Q0;

        // Transition function
        function transition(state, input) {
            switch (state) {
                case STATES.Q0:
                    return STATES.Q1; // Move to validation state
                case STATES.Q1:
                    return (isNaN(input) || input <= 1) ? STATES.Q3 : STATES.Q2; // Check input validity
                case STATES.Q2:
                    return STATES.Q3; // Move to result state
                case STATES.Q3:
                    return STATES.Q0; // Reset to start state
                default:
                    return STATES.Q0; // Default to start state
            }
        }

        // Event listener for the button
        document.getElementById('checkButton').addEventListener('click', function () {
            const number = parseInt(document.getElementById('numberInput').value);
            const resultElement = document.getElementById('result');

            // State machine logic
            switch (currentState) {
                case STATES.Q0:
                    currentState = transition(currentState, number);
                    break;
                case STATES.Q1:
                    if (isNaN(number) || number <= 1) {
                        resultElement.textContent = 'Masukkan bilangan bulat lebih besar dari 1.';
                        currentState = transition(currentState, number); // Move to q3 (error message)
                    } else {
                        currentState = transition(currentState, number); // Move to q2
                    }
                    break;
                case STATES.Q2:
                    const isPrime = checkPrime(number);
                    resultElement.textContent = isPrime
                        ? `${number} adalah bilangan prima.`
                        : `${number} bukan bilangan prima.`;
                    currentState = transition(currentState, number); // Move to q3
                    break;
                case STATES.Q3:
                    currentState = transition(currentState); // Reset to q0
                    break;
            }
        });

        // Function to check if a number is prime
        function checkPrime(num) {
            for (let i = 2; i <= Math.sqrt(num); i++) {
                if (num % i === 0) {
                    return false;
                }
            }
            return true;
        }
    </script>
</body>
</html>
