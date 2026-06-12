'''
Test cases for the calculator function.
'''

from django.test import SimpleTestCase
from app import calculator

class CalculatorTests(SimpleTestCase):
    """Tests for the calculator function."""

    def test_add_numbers(self):
        """Test that the two numbers are added together."""
        res = calculator.add(3, 8)
        self.assertEqual(res, 11)

    def test_add_strings(self):
        """Test that the two strings are added together."""
        res = calculator.add('Hello ', 'World')
        self.assertEqual(res, 'Hello World')

    def test_add_lists(self):
        """Test that the two lists are added together."""
        res = calculator.add([1, 2], [3, 4])
        self.assertEqual(res, [1, 2, 3, 4])