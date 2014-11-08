import csv


with open('Art_Murmur.csv', 'r') as csvfile:
    f = csv.reader(csvfile, delimiter=',')
    for row in f:
        print row  #','.join(row)


