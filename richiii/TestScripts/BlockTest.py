### Test.py # richiii
# Creates 3 transactions, adds them to a block, and prints out the block

from richiii.Block import * # Block class
from win.wincringe import * # Transaction class

t1 = Transaction("A", "B", 100, 0, 9)
t2 = Transaction("B", "C", 50,  0, 5)
t3 = Transaction("C", "A", 10,  0, 3)

tList = [t1, t2, t3]

block = Block(0, "asdf", 999, tList, 10, "A", "bruh")

print(block)