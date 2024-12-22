### Test_Transact.py # Ali
# Tests creating an UNSIGNED transaction (A -> B)

from Class_Transaction import *

print("***\n*** Transaction Test\n***")

t1 = Transaction("A", "B", 100, 1)
print(t1)