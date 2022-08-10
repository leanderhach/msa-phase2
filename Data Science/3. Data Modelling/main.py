import math

import pandas as pd
from pandas.api.types import is_numeric_dtype
from skforecast.ForecasterAutoreg import ForecasterAutoreg
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import matplotlib.pyplot as plt
import numpy as np
from sklearn.impute import SimpleImputer


# fetch data and remove non-needed columns
dataset = pd.read_csv("../weather-data.csv")
dataset = dataset.iloc[: , :-2]
dataset = dataset.iloc[:, 1:]

# sort the dataset by date
dataset = dataset.rename(columns={'valid': 'date'})
dataset['date'] = pd.to_datetime(dataset['date'], format='%Y-%m-%d')
dataset = dataset.set_index('date')
dataset = dataset.asfreq('W')
dataset = dataset.sort_index()

#replace missing values
fill_NaN = SimpleImputer(strategy='mean')

imputed_dataset = pd.DataFrame(fill_NaN.fit_transform(dataset))
imputed_dataset.columns = dataset.columns
imputed_dataset.index = dataset.index

pd.set_option('display.max_rows', None)
print(imputed_dataset)

steps = 100

data_train = imputed_dataset[:-steps]
data_test = imputed_dataset[-steps:]

print(f"Train dates : {data_train.index.min()} --- {data_train.index.max()}  (n={len(data_train)})")
print(f"Test dates  : {data_test.index.min()} --- {data_test.index.max()}  (n={len(data_test)})")

forecaster = ForecasterAutoreg(
                regressor=RandomForestRegressor(random_state=123),
                lags=20
                )

forecaster.fit(y=data_train['tmpc'])
predictions = forecaster.predict(steps=steps)

fig, ax=plt.subplots(figsize=(9, 4))

data_train['tmpc'].plot(ax=ax, label='train')
data_test['tmpc'].plot(ax=ax, label='test')
predictions.plot(ax=ax, label='predictions')

ax.legend();

plt.show()

error_mse = mean_squared_error(
                y_true = data_test['tmpc'],
                y_pred = predictions
            )

print(f"Test error (mse): {error_mse}")

# remove columns as needed
# formattedData = dataset.select_dtypes(['number']).iloc[: , :-2]
#
# print(formattedData.head())
#
# #split the data by row intow two sets, on to train and one to test with
# def train_test_split(testSize):
#     testable = formattedData.head(testSize)
#     trainable = formattedData.head(testSize*2)[testSize:]
#
#     return (testable, trainable)
#
# test, train = train_test_split(400)

#
# print(test)
# print(train)