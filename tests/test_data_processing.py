{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 3,
   "metadata": {},
   "outputs": [
    {
     "ename": "ImportError",
     "evalue": "cannot import name 'preprocess_data' from 'data_preprocessing' (/Users/himanshi/Downloads/data_preprocessing.py)",
     "output_type": "error",
     "traceback": [
      "\u001b[0;31m---------------------------------------------------------------------------\u001b[0m",
      "\u001b[0;31mImportError\u001b[0m                               Traceback (most recent call last)",
      "Cell \u001b[0;32mIn[3], line 11\u001b[0m\n\u001b[1;32m      9\u001b[0m \u001b[38;5;66;03m# Try importing preprocess_data function\u001b[39;00m\n\u001b[1;32m     10\u001b[0m \u001b[38;5;28;01mtry\u001b[39;00m:\n\u001b[0;32m---> 11\u001b[0m     \u001b[38;5;28;01mfrom\u001b[39;00m\u001b[38;5;250m \u001b[39m\u001b[38;5;21;01mdata_preprocessing\u001b[39;00m\u001b[38;5;250m \u001b[39m\u001b[38;5;28;01mimport\u001b[39;00m preprocess_data  \u001b[38;5;66;03m# If in the same directory\u001b[39;00m\n\u001b[1;32m     12\u001b[0m \u001b[38;5;28;01mexcept\u001b[39;00m \u001b[38;5;167;01mModuleNotFoundError\u001b[39;00m:\n\u001b[1;32m     13\u001b[0m     \u001b[38;5;28mprint\u001b[39m(\u001b[38;5;124m\"\u001b[39m\u001b[38;5;124m❌ Error: `data_preprocessing.py` not found! Check file location.\u001b[39m\u001b[38;5;124m\"\u001b[39m)\n",
      "\u001b[0;31mImportError\u001b[0m: cannot import name 'preprocess_data' from 'data_preprocessing' (/Users/himanshi/Downloads/data_preprocessing.py)"
     ]
    }
   ],
   "source": [
    "import unittest\n",
    "import sys\n",
    "import os\n",
    "import pandas as pd\n",
    "\n",
    "# Ensure the current directory is in sys.path\n",
    "sys.path.append(os.getcwd())\n",
    "\n",
    "# Try importing preprocess_data function\n",
    "try:\n",
    "    from data_preprocessing import preprocess_data  # If in the same directory\n",
    "except ModuleNotFoundError:\n",
    "    print(\"❌ Error: `data_preprocessing.py` not found! Check file location.\")\n",
    "\n",
    "# Define the test class\n",
    "class TestDataProcessing(unittest.TestCase):\n",
    "    def setUp(self):\n",
    "        # Setup test data\n",
    "        self.test_data = pd.DataFrame({\n",
    "            'name': ['John Doe', 'Jane Smith', None],  # Includes None to test missing values\n",
    "            'experience': [3, 5, 'two'],  # 'two' should be converted to 0\n",
    "            'skills': ['Python, AI', 'Java, ML', 'C++, Data Science']\n",
    "        })\n",
    "\n",
    "    def test_data_cleaning(self):\n",
    "        # Test the data cleaning function\n",
    "        processed_data = preprocess_data(self.test_data)\n",
    "\n",
    "        # Ensure no missing values\n",
    "        self.assertFalse(processed_data.isnull().any().any())\n",
    "\n",
    "        # Ensure experience is numeric\n",
    "        self.assertTrue(pd.api.types.is_numeric_dtype(processed_data['experience']))\n",
    "\n",
    "        # Ensure 'experience' converted 'two' to 0\n",
    "        self.assertEqual(processed_data['experience'].iloc[-1], 0)\n",
    "\n",
    "# Run the test\n",
    "if __name__ == '__main__':\n",
    "    unittest.main()\n"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "cmse802",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.9.21"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 2
}
