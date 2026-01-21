# <https://askubuntu.com/questions/1156409/conflicting-values-set-for-option-signed-by-regarding-source>

 sudo apt  update
[sudo] password for gokul:
Sorry, try again.
[sudo] password for gokul:
E: Conflicting values set for option Signed-By regarding source <https://apt.postgresql.org/pub/repos/apt/> jammy-pgdg: /usr/share/keyrings/postgresql-archive-keyring.gpg != /usr/share/postgresql-common/pgdg/apt.postgresql.org.gpg
E: The list of sources could not be read.
gokul@gokul-Latitude-E7250:~$ sudo nano /etc/apt/sources.list.d/pgdg.list
gokul@gokul-Latitude-E7250:~$ sudo rm /usr/share/postgresql-common/pgdg/apt.postgresql.org.gpg
rm: cannot remove '/usr/share/postgresql-common/pgdg/apt.postgresql.org.gpg': No such file or directory
gokul@gokul-Latitude-E7250:~$ wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor | sudo tee /usr/share/keyrings/postgresql-archive-keyring.gpg > /dev/null
gokul@gokul-Latitude-E7250:~$ sudo apt update
E: Conflicting values set for option Signed-By regarding source <https://apt.postgresql.org/pub/repos/apt/> jammy-pgdg: /usr/share/keyrings/postgresql-archive-keyring.gpg != /usr/share/postgresql-common/pgdg/apt.postgresql.org.gpg
E: The list of sources could not be read.
gokul@gokul-Latitude-E7250:~$ cd /etc/apt/sources.list.d
gokul@gokul-Latitude-E7250:/etc/apt/sources.list.d$ ls
brave-browser-release.list  pgadmin4.list           twilio.list
docker.list                 pgdg.list               windsurf.list
google-chrome.list          pgdg.sources
ngrok.list                  shiftkey-packages.list
gokul@gokul-Latitude-E7250:/etc/apt/sources.list.d$ sudo apt update
E: Conflicting values set for option Signed-By regarding source https://apt.postgresql.org/pub/repos/apt/ jammy-pgdg: /usr/share/keyrings/postgresql-archive-keyring.gpg != /usr/share/postgresql-common/pgdg/apt.postgresql.org.gpg
E: The list of sources could not be read.
gokul@gokul-Latitude-E7250:/etc/apt/sources.list.d$ sudo rm pgadmin4.list
gokul@gokul-Latitude-E7250:/etc/apt/sources.list.d$ sudo rm pgdg.list
gokul@gokul-Latitude-E7250:/etc/apt/sources.list.d$ sudo rm pgdg.sources
gokul@gokul-Latitude-E7250:/etc/apt/sources.list.d$ sudo apt update
Hit:1 https://brave-browser-apt-release.s3.brave.com stable InRelease
Hit:2 https://dl.google.com/linux/chrome/deb stable InRelease
Ign:3 https://apt.packages.shiftkey.dev/ubuntu any InRelease
Hit:4 https://download.docker.com/linux/ubuntu jammy InRelease
Hit:5 http://in.archive.ubuntu.com/ubuntu jammy InRelease
Get:6 http://in.archive.ubuntu.com/ubuntu jammy-updates InRelease [128 kB]
Hit:7 https://windsurf-stable.codeiumdata.com/wVxQEIWkwPUEAGf3/apt stable InRelease
Get:8 http://security.ubuntu.com/ubuntu jammy-security InRelease [129 kB]
Hit:9 https://ngrok-agent.s3.amazonaws.com buster InRelease
Hit:10 https://twilio-cli-prod.s3.amazonaws.com/apt  InRelease
Ign:3 https://apt.packages.shiftkey.dev/ubuntu any InRelease
Hit:11 http://in.archive.ubuntu.com/ubuntu jammy-backports InRelease
Ign:3 https://apt.packages.shiftkey.dev/ubuntu any InRelease
Err:3 https://apt.packages.shiftkey.dev/ubuntu any InRelease
  Certificate verification failed: The certificate is NOT trusted. The name in the certificate does not match the expected.  Could not handshake: Error in the certificate verification. [IP: 2620:1ec:bdf::58 443]
Fetched 257 kB in 8s (33.1 kB/s)
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
159 packages can be upgraded. Run 'apt list --upgradable' to see them.
N: Skipping acquire of configured file 'main/binary-i386/Packages' as repository 'https://brave-browser-apt-release.s3.brave.com stable InRelease' doesn't support architecture 'i386'
W: https://ngrok-agent.s3.amazonaws.com/dists/buster/InRelease: Key is stored in legacy trusted.gpg keyring (/etc/apt/trusted.gpg), see the DEPRECATION section in apt-key(8) for details.
W: https://twilio-cli-prod.s3.amazonaws.com/apt/InRelease: Key is stored in legacy trusted.gpg keyring (/etc/apt/trusted.gpg), see the DEPRECATION section in apt-key(8) for details.
W: Failed to fetch https://apt.packages.shiftkey.dev/ubuntu/dists/any/InRelease  Certificate verification failed: The certificate is NOT trusted. The name in the certificate does not match the expected.  Could not handshake: Error in the certificate verification. [IP: 2620:1ec:bdf::58 443]
W: Some index files failed to download. They have been ignored, or old ones used instead.
gokul@gokul-Latitude-E7250:`/etc/apt/sources.list.d$ ls`
brave-browser-release.list  ngrok.list              windsurf.list
docker.list                 shiftkey-packages.list
google-chrome.list          twilio.list
gokul@gokul-Latitude-E7250:/etc/apt/sources.list.d$ rm -rf brave-browser-release.list
rm: cannot remove 'brave-browser-release.list': Permission denied
gokul@gokul-Latitude-E7250:/etc/apt/sources.list.d$ sudo rm -rf brave-browser-release.list
gokul@gokul-Latitude-E7250:/etc/apt/sources.list.d$ sudo apt update
Hit:1 https://download.docker.com/linux/ubuntu jammy InRelease
Ign:2 https://apt.packages.shiftkey.dev/ubuntu any InRelease
Hit:3 https://dl.google.com/linux/chrome/deb stable InRelease
Hit:4 http://in.archive.ubuntu.com/ubuntu jammy InRelease
Hit:5 http://in.archive.ubuntu.com/ubuntu jammy-updates InRelease
Hit:6 https://windsurf-stable.codeiumdata.com/wVxQEIWkwPUEAGf3/apt stable InRelease
Hit:7 http://in.archive.ubuntu.com/ubuntu jammy-backports InRelease
Hit:8 https://ngrok-agent.s3.amazonaws.com buster InRelease
Hit:9 https://twilio-cli-prod.s3.amazonaws.com/apt  InRelease
Hit:10 http://security.ubuntu.com/ubuntu jammy-security InRelease
Ign:2 https://apt.packages.shiftkey.dev/ubuntu any InRelease
Ign:2 https://apt.packages.shiftkey.dev/ubuntu any InRelease  
Err:2 https://apt.packages.shiftkey.dev/ubuntu any InRelease
  Certificate verification failed: The certificate is NOT trusted. The name in the certificate does not match the expected.  Could not handshake: Error in the certificate verification. [IP: 2620:1ec:bdf::58 443]
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
157 packages can be upgraded. Run 'apt list --upgradable' to see them.
W: https://ngrok-agent.s3.amazonaws.com/dists/buster/InRelease: Key is stored in legacy trusted.gpg keyring (/etc/apt/trusted.gpg), see the DEPRECATION section in apt-key(8) for details.
W: https://twilio-cli-prod.s3.amazonaws.com/apt/InRelease: Key is stored in legacy trusted.gpg keyring (/etc/apt/trusted.gpg), see the DEPRECATION section in apt-key(8) for details.
W: Failed to fetch https://apt.packages.shiftkey.dev/ubuntu/dists/any/InRelease  Certificate verification failed: The certificate is NOT trusted. The name in the certificate does not match the expected.  Could not handshake: Error in the certificate verification. [IP: 2620:1ec:bdf::58 443]
W: Some index files failed to download. They have been ignored, or old ones used instead.
gokul@gokul-Latitude-E7250:/etc/apt/sources.list.d$ ls
docker.list         ngrok.list              twilio.list
google-chrome.list  shiftkey-packages.list  windsurf.list
gokul@gokul-Latitude-E7250:/etc/apt/sources.list.d$ `sudo rm -rf ngrok.list `
gokul@gokul-Latitude-E7250:/etc/apt/sources.list.d$ `sudo rm -rf twilio.list `
gokul@gokul-Latitude-E7250:/etc/apt/sources.list.d$ sudo rm -rf shiftkey-packages.list
gokul@gokul-Latitude-E7250:/etc/apt/sources.list.d$ sudo apt update
Hit:1 <https://download.docker.com/linux/ubuntu> jammy InRelease
Hit:2 <https://dl.google.com/linux/chrome/deb> stable InRelease
Hit:3 <https://windsurf-stable.codeiumdata.com/wVxQEIWkwPUEAGf3/apt> stable InRelease
Hit:4 <http://in.archive.ubuntu.com/ubuntu> jammy InRelease
Hit:5 <http://security.ubuntu.com/ubuntu> jammy-security InRelease
Hit:6 <http://in.archive.ubuntu.com/ubuntu> jammy-updates InRelease
Hit:7 <http://in.archive.ubuntu.com/ubuntu> jammy-backports InRelease
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
154 packages can be upgraded. Run 'apt list --upgradable' to see them.
gokul@gokul-Latitude-E7250:/etc/apt/sources.list.d$
