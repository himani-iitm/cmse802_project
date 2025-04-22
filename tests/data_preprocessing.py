{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 1,
   "metadata": {},
   "outputs": [],
   "source": [
    "import pandas as pd\n",
    "\n",
    "def preprocess_data(df):\n",
    "    \"\"\"\n",
    "    Cleans the input DataFrame by:\n",
    "    - Removing missing values\n",
    "    - Stripping whitespace from column names\n",
    "    - Converting experience to numeric type\n",
    "    \"\"\"\n",
    "    df = df.copy()  # Work on a copy to avoid modifying original data\n",
    "    \n",
    "    # Drop missing values\n",
    "    df.dropna(inplace=True)\n",
    "\n",
    "    # Strip column names of whitespace\n",
    "    df.columns = df.columns.str.strip()\n",
    "\n",
    "    # Convert experience column to numeric (if applicable)\n",
    "    if 'experience' in df.columns:\n",
    "        df['experience'] = pd.to_numeric(df['experience'], errors='coerce').fillna(0)\n",
    "\n",
    "    return df\n"
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
