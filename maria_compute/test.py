from maria_compute.RSA import *
from win.wincringe import *

t1 = Transaction("A","B", 100,0,9)

createmsg("alice",100,"bob")
print("Alice creates key")
e,d =  setup_pub_and_private()

createsig("create",d)