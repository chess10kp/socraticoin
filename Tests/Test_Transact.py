### Test_Transact.py # Ali
# Tests a transaction (A -> B)

# TODO: idk if it works cause not using RSA.py anymore

# from RSA import * # not used anymore
from Transaction import *

t1 = Transaction("A","B", 100,0,9)

createmsg("alice",100,"bob")
print("Alice creates key")
e,d =  setup_pub_and_private()

createsig("create",d)