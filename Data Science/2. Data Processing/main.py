import pandas as pd

from sklearn.impute import SimpleImputer

dataset = pd.read_csv("../weather-data.csv")


dataset = dataset.iloc[: , :-2]
dataset = dataset.iloc[:, 1:]

dataset = dataset.rename(columns={'valid': 'date'})
dataset['date'] = pd.to_datetime(dataset['date'], format='%Y/%m/%d')
data = dataset.set_index('date')
data = data.asfreq('MS')

#replace missing values
fill_NaN = SimpleImputer(strategy='mean')

imputed_dataset = pd.DataFrame(fill_NaN.fit_transform(dataset))
imputed_dataset.columns = dataset.columns
imputed_dataset.index = dataset.index


steps = 36
data_train = imputed_dataset[:-steps]
data_test = imputed_dataset[-steps:]

print(f"Train dates : {data_train.index.min()} --- {data_train.index.max()}  (n={len(data_train)})")
print(f"Test dates  : {data_test.index.min()} --- {data_test.index.max()}  (n={len(data_test)})")