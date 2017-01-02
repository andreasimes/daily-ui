**002 - credit card checkout**

As part of my attempt to make this credit card checkout challenge as realistic as possible, I wanted to write an algorithm to insert spaces in the credit card number inputted by the user, every 4 digits, as the number appears on the card itself. In order to do this, I wrote two functions in the script.js file (numberSpacer and removeWhitespace). 


'''removeWhitespace'''
removeWhitespace is a helper function that removes all whitespace from a string of digits. I decided to write it and use it within numberSpacer so that everytime numberSpacer runs, it can run on a string without spaces, therefore simplifying the process of counting digits (and thus not counting whitespace characters). removeWhitespace is a recursive function that calls itself on the returned result until there are no more whitespaces in the string (this is the base case). 

'''numberSpacer'''
numberSpacer works by calling removeWhitespace and then by iterating over the string and inserting a whitespace character everytime the index is incremented to a value for which index%5 = 3.


TODO: Implement Luhn algo or alternative to validate credit card number
