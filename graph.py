import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("./result.csv", header=2)

sns.set_theme(style="whitegrid")
p = sns.scatterplot(data=df, x="items", y="length", hue="type")
p.set_title("bloom filter n=7,188,794 , k=10")
plt.ticklabel_format(style='plain', axis='y')

plt.savefig("./result.png")