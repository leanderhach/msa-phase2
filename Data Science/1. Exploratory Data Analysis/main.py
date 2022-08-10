import math

import pandas as pd
import seaborn as sns
from pandas.api.types import is_numeric_dtype

import matplotlib.pyplot as plt


dataset = pd.read_csv("../weather-data.csv")

result = {
    "col1": ["Average", "Standard Deviation", "Percentile Range (10th)", "Percentile Range (90th)"],
}

loc = 1

for index, column in enumerate(dataset):
    if is_numeric_dtype(dataset[column]):

        header = dataset["valid"][index]

        # increment loc
        loc = loc + 1

        average = dataset[column].mean()

        if not math.isnan(average):
            std = dataset[column].std()
            percentileRangeFirst = dataset[column].quantile(.1)
            percentileRangeSecond = dataset[column].quantile(.9)

            result["%s"%(header)] = [average, std, percentileRangeFirst, percentileRangeSecond]


formattedData = pd.DataFrame(result)

sns.set()
sns.heatmap(formattedData.corr())
plt.show()

plt.close("all")

graphableData = formattedData.cumsum()

print(graphableData)
plt.figure()
graphableData.plot()

plt.show()

