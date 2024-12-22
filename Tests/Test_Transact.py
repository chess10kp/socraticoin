### Test_Transact.py # Ali
# Tests creating an UNSIGNED transaction (A -> B)

from Class_Transaction import *

t1 = Transaction("A", "B", 100, 1)

print("***\n*** Transaction Test\n***")
print(t1)