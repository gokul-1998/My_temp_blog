- this will create a .pub key and add to the server, so that you dont need to put passsword ever.

```
ssh-keygen -t rsa -b 4096 -f ~/.ssh/gpu_server
ssh-copy-id -i ~/.ssh/gpu_server.pub bla_user@192.168.11.11
ssh 'bla_user@192.168.11.11'
```
