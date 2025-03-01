# `mapRight`

## Description
`mapRight` is a utility function that applies a given callback function to each element of an array, processing it from right to left.

Since JavaScript does not provide a built-in mapRight function, we can achieve the same effect by either:

* Reversing the array (array.slice().reverse().map(callback)) and then applying map

* Using a traditional for-loop that iterates from the last element (n-1) to the first (0) and applies the transformation manually.

Why Use mapRight?

* Preserves Original Array.

* Better Performance – Avoids reverse().map() overhead.

* Cleaner Code – More readable.

* Processes Right to Left – Directly iterates from the last element to the first without reversing.